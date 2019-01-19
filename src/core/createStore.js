import {isPlainObject, isPlainString} from "../loggers/type";
import {throwIf, warnIf} from "../loggers/throwIf";

const isProd = process.env.NODE_ENV === 'production'

/**
 * @param conf: {
 *   reducers,
 *   state,
 *   mode,
 *   plugin,
 *   ignoreDefaultConfig
 * }
 * */
const createStore = (conf) => {
    let {
        reducers,
        state,
        plugin,
        ignoreDefaultConfig,
        mode = 'strict'
    } = conf

    if (!isPlainObject(state)) {
        throw new TypeError(`type of state expect to [Object] but got [${typeof state}]`)
    }

    let currentState = observeObject(state, mode, ignoreDefaultConfig)
    let currentReducer = passReducer(reducers)
    let plugins = passPlugin(plugin)
    let isDispatching = null

    const dispatch = (action, ...args) => {
        let argsCopy = cloneObj(args)

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

            let draft = cloneObj(currentState)

            warnIf(
                !reducers[action],
                `You may not has not registered [${action}] in store`
            )

            walkPlugins('before', plugins, currentState, draft, action)

            if (currentReducer[action]) {
                let newState = currentReducer[action](draft, ...argsCopy)

                warnIf(
                    newState === undefined,
                    `It is recommended to return a new state to replace the old state, ` +
                    `which is more conducive to our observation of state changes in complex situations.`
                )

                currentState = observeObject(newState || draft, mode, ignoreDefaultConfig)
            }

            walkPlugins('after', plugins, currentState, draft, action)
        } finally {
            isDispatching = null
        }

        return action
    }

    const subscribe = (action, listener) => {
        throwIf(
            typeof listener !== 'function',
            `Expected the listener to be a function.`
        )

        throwIf(
            isDispatching,
            `You may not call store.subscribe() while the reducer is executing. ` +
            `If you would like to be notified after the store has been updated, subscribe from a ` +
            `component and invoke store.getState() in the callback to access the latest state. `
        )

        warnIf(
            currentReducer.hasOwnProperty(action),
            `Action [${action}] has been registered. ` +
            `It allows only the new one will be retained when you repeat the subscription.`
        )

        currentReducer[action] = listener

        const unsubscribe = () => {
            throwIf(
                isDispatching === action,
                `You may not unsubscribe from a store listener while the reducer is executing. `
            )

            const hasAction = currentReducer.hasOwnProperty(action)

            warnIf(
                !hasAction,
                `Action [${action}] not exist.`
            )

            if (hasAction) delete currentReducer[action]
        }

        return unsubscribe
    }


    const getState = () => {
        throwIf(
            isDispatching,
            'You may not call store.getState() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )

        return currentState
    }

    const applyPlugin = (p) => {
        validatePlugin(p)

        throwIf(
            isDispatching,
            'You may not call removeMiddleware() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )

        if (!plugins) plugins = []
        plugins.push(p)
    }

    return {
        dispatch,
        subscribe,
        getState,
        applyPlugin
    }
}

const observeObject = (object, mode, ignoreDefaultConfig) => {
    if ((isProd && !ignoreDefaultConfig) || mode === 'loose') return object

    const createProxy = (prefix, object) => {
        let objectProxyHandler = {
            set: () => {
                throw new Error(
                    `You may not be able to assign values ​​directly to state. ` +
                    `Please return a new state for reducing or edit with draft in reducer.`
                )
            },
            get: (target, property) => {
                const value = target[property];

                if (isPlainObject(value)) {
                    return createProxy(prefix + property + '.', value)
                } else if (Array.isArray(value)) {
                    return new Proxy(value, arrayProxyHandler);
                } else {
                    return value
                }
            }
        }

        let arrayProxyHandler = {
            ...objectProxyHandler,
            set: (target, property) => {
                if (property === '__proto__') return true

                throw new Error(
                    `You may not be able to assign values ​​directly to state. ` +
                    `Please return a new state for reducing or edit with draft in reducer.`
                )
            }
        }

        return new Proxy(object, objectProxyHandler);
    }

    const createObserve = (obj) => {
        for (let key in obj) {
            let val = obj[key]

            if (isPlainObject(val)) createObserve(val)

            Object.defineProperty(obj, key, {
                set: () => {
                    throw new Error(
                        `You may not be able to assign values ​​directly to state. ` +
                        `Please return a new state for reducing or edit with draft in reducer.`
                    )
                },
                get: () => {
                    return val
                }
            })
        }

        return obj
    }

    // Proxy not support IE
    // Object.defineProperty not supported below IE9
    // Bundle would all support because there are no strict for production
    // Ignoring config of production with the forth param of method "createStore"
    if (isProd && !ignoreDefaultConfig) return object

    switch (mode) {
        case 'strict':
            return createProxy('', object)
        case 'standard':
            return createObserve(object)
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

const walkPlugins = (hook, plugins, currentState, draft, action) => {
    plugins && plugins.forEach(p => {
        p[hook] && p[hook](currentState, draft, action)
    })
}

const cloneObj = (source) => {
    return JSON.parse(JSON.stringify(source));
}

export default createStore
