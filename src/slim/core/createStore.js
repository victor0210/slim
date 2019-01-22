import {isPlainObject, isPlainString} from "../loggers/type";
import {throwIf, warnIf} from "../loggers/throwIf";

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
        throw new TypeError(`type of state expect to [Object] but got [${typeof state}]`)
    }

    let currentState = observeObject(state, mode)
    let currentReducer = passReducer(reducers)
    let plugins = passPlugin(plugin)

    aliases = passAlias(aliases)

    const dispatch = (action, ...args) => {
        throwIf(
            !isPlainString(action),
            `Actions must be plain string. ` +
            `Use custom middleware for all actions.`
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

                warnIf(
                    newState === undefined,
                    `It is recommended to return a new state to replace the old state, ` +
                    `which is more conducive to our observation of state changes in complex situations.`
                )

                if (newState && newState !== currentState) {
                    currentState = observeObject(newState, mode)
                } else {
                    observeObject(currentState, mode)
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
            'You may not call store.getState() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
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
            'You may not call removeMiddleware() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )

        !plugins ? plugins = [p] : plugins.push(p)
    }

    let store = new Proxy({
        dispatch,
        getState,
        applyPlugin,
        state: null
    }, {
        get (target, p, receiver) {
            if (p === 'state') return currentState

            return Reflect.get(target, p, receiver)
        },

        set (target, p, value) {
            throwIf(
              !isDispatching,
              `You may not be able to assign values ​​directly to store. ` +
              `Please return a new state for reducing or edit with state in reducer.`
            )

            return Reflect.set(target, p, value)
        }
    })

    return store
}

const observeObject = (object, mode) => {
    const createProxy = (object, observeArray) => {
        let objectProxyHandler = {
            set: (target, property, value) => {
                throwIf(
                    !isDispatching,
                    `You may not be able to assign values ​​directly to state. ` +
                    `Please return a new state for reducing or edit with state in reducer.`
                )

                return Reflect.set(target, property, value)
            },
            get: (target, property) => {
                return Reflect.get(target, property)
            }
        }

        let arrayProxyHandler = {
            ...objectProxyHandler,
            set: (target, property, value) => {
                if (!isDispatching) {
                    if (property === '__proto__')  return Reflect.set(target, property, value)

                    throw new Error(
                        `You may not be able to assign values ​​directly to state. ` +
                        `Please return a new state for reducing or edit with state in reducer.`
                    )
                } else {
                    return Reflect.set(target, property, value)
                }
            }
        }

        for (let key in object) {
            let val = object[key]

            if (isPlainObject(val)) {
                if (val.$$isSlimProxy) {
                    createProxy(val)
                } else {
                    object[key] = createProxy(val)
                }
            } else if (Array.isArray(val)) {
                if (val.$$isSlimProxy) {
                    createProxy(val)
                } else {
                    object[key] = createProxy(val, true)
                }
            }
        }

        if (object.$$isSlimProxy) {
            return object
        } else {
            object.$$isSlimProxy = true
            return new Proxy(object, observeArray ? arrayProxyHandler : objectProxyHandler)
        }
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
            `Reducer for key [${key}] must be type of [Function] but got [${typeof reducer}]`
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
          `Alias for key [${key}] must be type of [Function] but got [${typeof alias}]`
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
      `Hook [before] of Plugin must be type of [Function] but got [${typeof before}]`
    )

    after && throwIf(
      typeof after !== 'function',
      `Hook [before] of Plugin must be type of [Function] but got [${typeof after}]`
    )
}

const walkPlugins = (hook, plugins, currentState, action) => {
    plugins && plugins.forEach(p => {
        p[hook] && p[hook](currentState, action)
    })
}

export default createStore
