import {createStore} from '../../../src/slim'

const reducers = {
    'incrementCount': (state) => {
    state.count += 1
},
    'incrementNum': (state) => {
    state.num += 1
}
}

const state = {
    num: 1,
    count: 1
}

const numPlugin = {
    before (state, action) {
        if (action === 'incrementNum') state.num += 1
    },
    after (state, action) {
        if (action === 'incrementNum') state.num += 1
    }
}

const countPlugin = {
    before (state, action) {
        if (action === 'incrementCount') state.count += 1
    },
    after (state, action) {
        if (action === 'incrementCount') state.count += 1
    }
}

const store = createStore({
    reducers,
    state,
    plugin: numPlugin
})

store.applyPlugin(countPlugin)

describe('run middleware', () => {
    const result = 4
    it(`middleware change state directly`, () => {
        store.dispatch('incrementCount')
        store.dispatch('incrementNum')

        expect(store.getState().num).toBe(result)
        expect(store.getState().count).toBe(result)
        expect(store.getState()).toEqual({num: result, count: result})
    })
})
