import EventCenter from './eventCenter'
import {isPlainObject, isPlainString} from '../helpers/type'
import {cloneObj, msgHelper, passGetter, passPlugin, passReducer, validatePlugin, walkPlugins} from '../helpers/util'
import {throwIf, warnIf} from '../helpers/throwIf'

let injectPlugins = []
let isDispatching = null
let isStrict = false
let store

/**
 * @param conf: {
 *   reducers,
 *   state,
 *   mode,
 *   plugin,
 *   getters
 * }
 * */

export const createStore = (conf) => {
    let {
        reducers = {},
        state = {},
        plugin,
        getters = {},
        mode = 'strict'
    } = conf

    if (!isPlainObject(state)) {
        throw new TypeError(msgHelper.typeError(typeof state))
    }

    isStrict = mode === 'strict'

    let {on, off, emit} = EventCenter
    let currentState = observeObject(state)
    let currentReducer = passReducer({
        ...reducers,
        '__SLIM_DEVTOOL_SET__': (state, stateFromDevTool) => stateFromDevTool
    })


    let plugins = [...injectPlugins, ...passPlugin(plugin)]

    getters = passGetter(getters)

    const dispatch = (action, ...args) => {
        throwIf(
            !isPlainString(action),
          msgHelper.shouldBe('Actions', 'string', typeof action)
        )

        throwIf(
            isDispatching,
            `Reducers may not dispatch actions.`
        )

        try {
            isDispatching = action

            warnIf(
                !currentReducer[action],
                `You may not has not registered [${action}] in store`
            )

            walkPlugins('before', plugins, currentState, action)

            if (currentReducer[action]) {
                let newState = currentReducer[action](currentState, ...args)
                if (newState && newState !== currentState) {
                    currentState = observeObject(newState)

                    store.state = currentState
                }
            }

            walkPlugins('after', plugins, currentState, action)
        } finally {
            isDispatching = null
        }

        return store
    }

    const getState = (aliasKey) => {
        throwIf(
            isDispatching,
            msgHelper.cantCall('store.getState()')
        )

        warnIf(
          aliasKey && !getters.hasOwnProperty(aliasKey),
          `Getter of key [${aliasKey}] is not exist. ` +
          `Please register it with when createStore.`
        )

        return aliasKey
          ? getters[aliasKey]
            ? getters[aliasKey](currentState)
            : undefined
          : currentState
    }

    store = {
        on,
        off,
        emit,
        dispatch,
        getState,
        state: currentState
    }

    walkPlugins('init', plugins, store)

    return store
}

const observeObject = (object) => {
    const _createProxy = (val) => {
        if (isPlainObject(val)) {
            return createProxy(val)
        } else if (Array.isArray(val)) {
            return createProxy(val, true)
        }

        return val
    }
    const createProxy = (object, observeArray) => {
        let objectProxyHandler = {
            set: (target, property, value) => {
                throwIf(
                    !isDispatching,
                  msgHelper.cantAssign()
                )

                return Reflect.set(target, property, _createProxy(cloneObj(value)))
            },
            get: (target, property) => {
                return Reflect.get(target, property)
            }
        }

        let arrayProxyHandler = {
            ...objectProxyHandler,
            set: (target, property, value) => {
                if (property === '__proto__')  return Reflect.set(target, property, value)

                if (!isDispatching) {
                    throw new Error(
                      msgHelper.cantAssign()
                    )
                } else {
                    return Reflect.set(target, property, _createProxy(cloneObj(value)))
                }
            }
        }

        for (let key in object) {
            object[key] = _createProxy(object[key])

        }

        return new Proxy(object, observeArray ? arrayProxyHandler : objectProxyHandler)
    }

    return isStrict ? createProxy(object) : object
}

export const use = (p) => {
    validatePlugin(p)

    injectPlugins.push(p)
}

