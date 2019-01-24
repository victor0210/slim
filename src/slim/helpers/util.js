import {throwIf} from './throwIf'

const fnT = 'Function'

export const passReducer = (reducers) => {
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

export const passAlias = (aliases) => {
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

export const passPlugin = (plugins) => {
    if (!plugins) return

    let ps = Array.isArray(plugins) ? plugins : [plugins]

    ps.forEach(p => {
        validatePlugin(p)
    })

    return ps
}

export const validatePlugin = (p) => {
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

export const walkPlugins = (hook, plugins, currentState, action) => {
    plugins && plugins.forEach(p => {
        p[hook] && p[hook](currentState, action)
    })
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

export const cloneObj = p => JSON.parse(JSON.stringify(p))
