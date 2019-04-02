import {throwIf} from './throwIf'
import {isPlainObject} from './type'

export const fnT = 'Function'
const fnO = 'Object'

export const isFn = (fn) => typeof fn === 'function'

export const passFunction = (funcs, funcKey) => {
    const keys = Object.keys(funcs)

    keys.forEach(key => {
        let func = funcs[key]

        throwIf(
          !isFn(func),
          `${funcKey} for key [${key}] must be type of [${fnT}] but got [${typeof func}]`
        )
    })

    return funcs
}

export const passPlugin = (plugins) => {
    if (!plugins) return []

    let ps = Array.isArray(plugins) ? plugins : [plugins]

    ps.forEach(p => {
        validatePlugin(p)
    })

    return ps
}

export const validatePlugin = (p) => {
    throwIf(
      !isPlainObject(p),
      msgHelper.shouldBe('Plugin', fnO, typeof p)
    )

    const {before, after, beforeSet} = p

    before && throwIf(
      !isFn(before),
      msgHelper.shouldBe('Plugin.before', fnT, typeof before)
    )
    beforeSet && throwIf(
      !isFn(beforeSet),
      msgHelper.shouldBe('Plugin.beforeSet', fnT, typeof beforeSet)
    )
    after && throwIf(
      !isFn(after),
      msgHelper.shouldBe('Plugin.after', fnT, typeof after)
    )
}

export const walkInsidePlugins = (hook, plugins, target, property, value, receiver) => {
    plugins && plugins.forEach(p => {
        walkPlugin(hook, p, target, property, value, receiver)
    })
}

export const walkPlugins = (hook, plugins, currentState, reducerKey) => {
    plugins && plugins.forEach(p => {
        walkPlugin(hook, p, currentState, reducerKey)
    })
}

export const walkPlugin = (hook, plugin, ...args) => {
    plugin[hook] && plugin[hook](...args)
}

export const msgHelper = {
    typeError: (type) => `type of state expect to [Object] but got [${type}]`,
    shouldBe: (name, expect, got) => `${name} should be type of [${expect}] but got [${got}]`,
    cantCall: (key) => `You may not call ${key} while the reducer is executing. ` +
      'The reducer has already received the state as an argument. ' +
      'Pass it down from the top reducer instead of reading it from the store.',
    cantAssign: () => `You may not be able to assign values ​​directly to state. ` +
      `Please return a new state for reducing or edit with state in reducer.`
}

export const parse2Json = data => isPlainObject(data) ? data : JSON.parse(data)
