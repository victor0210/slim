import EventCenter from './eventCenter'
import {isPlainObject, isPlainString} from '../helpers/type'
import {cloneObj, msgHelper, passAlias, passPlugin, passReducer, validatePlugin, walkPlugins} from '../helpers/util'
import {throwIf, warnIf} from '../helpers/throwIf'

let isDispatching = null

/**
 * @param conf: {
 *   reducers,
 *   state,
 *   mode,
 *   plugin,
 *   aliases
 * }
 * */

const createStore = (conf) => {
    let {
        reducers = {},
        state = {},
        plugin,
        aliases = {},
        mode = 'strict'
    } = conf

    if (!isPlainObject(state)) {
        throw new TypeError(msgHelper.typeError(typeof state))
    }

    let {on, off, emit} = EventCenter
    let currentState = observeObject(state, mode)
    let currentReducer = passReducer(reducers)
    let plugins = passPlugin(plugin)

    aliases = passAlias(aliases)

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
                !reducers[action],
                `You may not has not registered [${action}] in store`
            )

            walkPlugins('before', plugins, currentState, action)

            if (currentReducer[action]) {
                let newState = currentReducer[action](currentState, ...args)

                if (newState && newState !== currentState) {
                    currentState = observeObject(newState, mode)
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
          aliasKey && !aliases.hasOwnProperty(aliasKey),
          `Alias of key [${aliasKey}] is not exist. ` +
          `Please register it with when createStore.`
        )

        return aliasKey
          ? aliases[aliasKey]
            ? aliases[aliasKey](currentState)
            : undefined
          : currentState
    }

    const applyPlugin = (p) => {
        validatePlugin(p)

        throwIf(
            isDispatching,
          msgHelper.cantCall('removeMiddleware()')
        )

        !plugins ? plugins = [p] : plugins.push(p)
    }

    let store = new Proxy({
        on,
        off,
        emit,
        dispatch,
        getState,
        applyPlugin,
        state: currentState
    }, {
        get (target, p) {
            if (p === 'state') return currentState

            return Reflect.get(target, p)
        },

        set () {
            throwIf(
              !isDispatching,
                msgHelper.cantAssign()
            )
        }
    })

    return store
}

const observeObject = (object, mode) => {
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

    switch (mode) {
        case 'strict':
            return createProxy(object)
        case 'loose':
            return object
    }
}

export default createStore
