import {isPlainObject, isPlainString} from "../loggers/type";
import {throwIf, warnIf} from "../loggers/throwIf";

const createStore = (reducer, state) => {
    if (!isPlainObject(state)) {
        throw new TypeError(`type of state expect to [Object] but got [${typeof state}]`)
    }

    let currentState = observeObject(state)
    let currentReducer = passReducer(reducer)
    let middlewares = []
    let callbacks = []
    let isDispatching = null

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
                !reducer[action],
                `You may not has not registered [${action}] in store`
            )

            walkMiddleware(middlewares, currentState, ...args)

            if (currentReducer[action]) {
                let newState = currentReducer[action](currentState, ...args)

                throwIf(
                    newState === undefined,
                    `You might not return an new state. ` +
                    `We will not replace state with undefined. ` +
                    `Please return an empty object such as {} instead.`
                )

                currentState = observeObject(newState)
            }

            walkMiddleware(callbacks, currentState, ...args)
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

    const applyMiddleware = (m) => {
        throwIf(
            typeof m !== 'function',
            `Expected the listener to be a function.`
        )

        throwIf(
            isDispatching,
            'You may not call removeMiddleware() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )

        middlewares.push(m)

        const removeMiddleware = () => {
            middlewares.splice(middlewares.indexOf(m), 1)
        }

        return removeMiddleware
    }

    const applyCallback = (c) => {
        throwIf(
            typeof c !== 'function',
            `Expected the listener to be a function.`
        )

        throwIf(
            isDispatching,
            'You may not call removeMiddleware() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )

        callbacks.push(c)

        const removeCallback = () => {
            callbacks.splice(callbacks.indexOf(c), 1)
        }

        return removeCallback
    }

    return {
        dispatch,
        subscribe,
        applyMiddleware,
        applyCallback,
        getState
    }
}

const observeObject = (object) => {
    const createProxy = (prefix, object) => {
        const arrayProxyHandler = {
            get: (target, property) => {
                const value = target[property];

                if (isPlainObject(value)) {
                    return createProxy(prefix + property + '.', value)
                } else if (Array.isArray(value)) {
                    return new Proxy(value, arrayProxyHandler);
                } else {
                    return value
                }
            },
            set: (target, property) => {
                if (property === '__proto__') return true

                throw new Error(
                    `You may not be able to assign values ​​directly to state. ` +
                    `Please return a new state for reducing.`
                )
            }
        }

        const objectProxyHandler = {
            set: () => {
                throw new Error(
                    `You may not be able to assign values ​​directly to state. ` +
                    `Please return a new state for reducing.`
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

        return new Proxy(object, objectProxyHandler);
    }

    return createProxy('', object);
}

const passReducer = (reducer) => {
    const keys = Object.keys(reducer)

    keys.forEach(key => {
        let listener = reducer[key]

        throwIf(
            typeof listener !== 'function',
            `Reducer for key [${key}] must be type of [Function] but got [${typeof listener}]`
        )
    })

    return reducer
}

const walkMiddleware = (middlewares, currentState, ...args) => {
    middlewares.forEach(m => {
        m(currentState, ...args)
    })
}

export default createStore
