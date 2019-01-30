import {isPlainObject, isPlainString} from '../helpers/type'
import {isFn, msgHelper, passGetter, passPlugin, passReducer, validatePlugin, walkPlugins} from '../helpers/util'
import {throwIf, warnIf} from '../helpers/throwIf'

let injectPlugins = []
let isDispatching = null
let isStrict = false
let store
let operations = []
let validateFn
let customSetterFn
let plugins
const STRICT = 'strict'

export const createStore = (conf) => {
    let {
        reducers = {},
        state = {},
        plugin,
        getters = {},
        mode = STRICT,
        setterValidator,
        customSetter
    } = conf

    if (!isPlainObject(state)) {
        throw new TypeError(msgHelper.typeError(typeof state))
    }

    isStrict = mode === STRICT

    // for integrated confidently by the third party,
    // which not be recommended to use in the bossiness
    validateFn = isFn(setterValidator) ? setterValidator : undefined
    customSetterFn = isFn(customSetter) ? customSetter : undefined

    let currentState = observeObject(state)
    let currentReducer = passReducer({
        ...reducers,
        '__SLIM_DEVTOOL_SET__': (state, stateFromDevTool) => stateFromDevTool
    })


    plugins = [...injectPlugins, ...passPlugin(plugin)]

    getters = passGetter(getters)

    const dispatch = (action, ...args) => {
        operations = []

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
        dispatch,
        getState,
        state: currentState,
        getters: getters
    }

    walkPlugins('init', plugins, store)

    return store
}

/*
* observe all by proxy
* */
const observeObject = (object) => {
    const _createProxy = (val) => {
       return isPlainObject(val) || Array.isArray(val)
          ? createProxy(val)
          : val
    }
    const createProxy = (object) => {
        let objectProxyHandler = {
            set: (target, property, value, receiver) => {
                throwIf(
                  !isDispatching &&
                  (
                    (
                      validateFn &&
                      !validateFn(target, property, value, receiver)
                    ) ||
                      !validateFn
                  ),
                  msgHelper.cantAssign()
                )

                walkPlugins('beforeSet', plugins, target, property, value, receiver)

                const defaultSetter = () => {
                    return Reflect.set(target, property, _createProxy(value), receiver)
                }

                return customSetterFn
                  ? customSetterFn(target, property, value, receiver, defaultSetter)
                  : defaultSetter()
            },
            get: (target, property, receiver) => {
                return Reflect.get(target, property, receiver)
            }
        }

        for (let key in object) {
            object[key] = _createProxy(object[key])
        }

        return new Proxy(object, objectProxyHandler)
    }

    return isStrict ? createProxy(object) : object
}

export const use = (p) => {
    validatePlugin(p)

    injectPlugins.push(p)
}
