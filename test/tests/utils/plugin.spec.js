import {createStore} from '../../../src/index'

const reducers = {}

const state = {
    num: 1,
    count: 1
}

const numPlugin = {
    before (state, draft, action) {
        if (action === 'incrementNum') draft.num += 1
    },
    after (state, draft, action) {
        if (action === 'incrementNum') draft.num += 1
    }
}

const countPlugin = {
    before (state, draft, action) {
        if (action === 'incrementCount') draft.count += 1
    },
    after (state, draft, action) {
        if (action === 'incrementCount') draft.count += 1
    }
}

const store = createStore({
    reducers,
    state,
    plugin: numPlugin
})

store.applyPlugin(countPlugin)

store.subscribe('incrementCount', (draft) => {
    draft.count += 1
})

store.subscribe('incrementNum', (draft) => {
    draft.num += 1
})

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
