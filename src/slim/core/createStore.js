import {isPlainObject, isPlainString} from '../helpers/type'
import {fnT, isFn, msgHelper, passFunction, passPlugin, validatePlugin, walkPlugins} from '../helpers/util'
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
const __DEVTOOL_EXT__ = '__SLIM_DEVTOOL_SET__'

export const createStore = (conf) => {
    let {
        reducers = {},
        actions = {},
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

    let currentReducer = passFunction({
        ...reducers,
        [__DEVTOOL_EXT__]: (state, stateFromDevTool) => stateFromDevTool
    }, 'Reducer')

    let currentActions = passFunction({
        ...actions,
        [__DEVTOOL_EXT__]: (context, stateFromDevTool) => context.commit(__DEVTOOL_EXT__, stateFromDevTool)
    }, 'Action')

    plugins = [...injectPlugins, ...passPlugin(plugin)]

    const passGetter = (getters) => {
        const keys = Object.keys(getters)

        keys.forEach(key => {
            let getter = getters[key]

            throwIf(
              !isFn(getter),
              msgHelper.shouldBe(`Getter.${key}`, fnT, typeof getter)
            )
        })

        return getters
    }

    getters = new Proxy(passGetter(getters), {
        get: (target, property) => {
            return target.hasOwnProperty(property)
                ? target[property](currentState)
                : undefined
        },
        set: () => {
            throw new Error(msgHelper.cantAssign())
        }
    })

    const dispatch = (action, ...args) => {
        operations = []

        throwIf(
            !isPlainString(action),
          msgHelper.shouldBe('Actions', 'string', typeof action)
        )

        warnIf(
            !currentActions[action],
            `You may not has not registered Action:[${action}] in store`
        )

        if (currentActions[action]) {
            currentActions[action](store, ...args)
        }

        return store
    }

    const commit = (reducerKey, ...args) => {
        operations = []

        throwIf(
          !isPlainString(reducerKey),
          msgHelper.shouldBe('reducerKey', 'string', typeof reducerKey)
        )

        throwIf(
          isDispatching,
          `Reducers may not commit will another reducer is dispatching.`
        )

        try {
            isDispatching = true

            warnIf(
              !currentReducer[reducerKey],
              `You may not has not registered Reducer:[${reducerKey}] in store`
            )

            walkPlugins('before', plugins, currentState, reducerKey)

            if (currentReducer[reducerKey]) {
                let newState = currentReducer[reducerKey](currentState, ...args)
                if (newState && newState !== currentState) {
                    currentState = observeObject(newState)

                    store.state = currentState
                }
            }

            walkPlugins('after', plugins, currentState, reducerKey)
        } finally {
            isDispatching = null
        }

        return store
    }

    const getGetter = (key) => {
        return key ? getters[key] : getters
    }

    store = {
        dispatch,
        commit,
        getGetter,
        state: currentState
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
