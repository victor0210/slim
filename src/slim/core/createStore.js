import {isPlainObject, isPlainString} from "../loggers/type";
import {throwIf, warnIf} from "../loggers/throwIf";
import EventCenter from './eventCenter'

let isDispatching = null

const fnT = 'Function'

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

const passReducer = (reducers) => {
    const keys = Object.keys(reducers)

    keys.forEach(key => {
        let reducer = reducers[key]

        throwIf(
            typeof reducer !== 'function',
            `Reducer for key [${key}] must be type of [fnT] but got [${typeof reducer}]`
        )
    })

    return reducers
}

const passAlias = (aliases) => {
    const keys = Object.keys(aliases)

    keys.forEach(key => {
        let alias = aliases[key]

        throwIf(
          typeof alias !== 'function',
          msgHelper.shouldBe(`Alias.${key}`, fnT, typeof alias)
        )
    })

    return aliases
}

const passPlugin = (plugins) => {
    if (!plugins) return

    let ps = Array.isArray(plugins) ? plugins : [plugins]

    ps.forEach(p => {
        validatePlugin(p)
    })

    return ps
}

const validatePlugin = (p) => {
    const {before, after} = p
    before && throwIf(
      typeof before !== 'function',
      msgHelper.shouldBe('Plugin.after', fnT, typeof before)
    )

    after && throwIf(
      typeof after !== 'function',
      msgHelper.shouldBe('Plugin.after', fnT, typeof after)
    )
}

const walkPlugins = (hook, plugins, currentState, action) => {
    plugins && plugins.forEach(p => {
        p[hook] && p[hook](currentState, action)
    })
}

const msgHelper = {
    typeError: (type) => `type of state expect to [Object] but got [${type}]`,
    shouldBe: (name, expect, got) => `${name} should be type of [${expect}] but got [${got}]`,
    cantCall: (key) => `You may not call ${key} while the reducer is executing. ` +
      'The reducer has already received the state as an argument. ' +
      'Pass it down from the top reducer instead of reading it from the store.',
    cantAssign: () => `You may not be able to assign values ​​directly to state. ` +
      `Please return a new state for reducing or edit with state in reducer.`
}

const cloneObj = p => JSON.parse(JSON.stringify(p))

export default createStore
