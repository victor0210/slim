import {createStore} from '../../../src/index'

const reducers = {}

const state = {
    num: 1
}

const store = createStore(reducers, state)

store.subscribe('increment', (draft) => {
    draft.num += 1
})

const removeMiddleware = store.applyMiddleware((draft) => {
    draft.num += 1
})

const removeCallback = store.applyCallback((draft) => {
    draft.num += 1
})

describe('apply middleware', () => {
    store.subscribe('increment', (draft) => {
        draft.num += 1
    })
})

describe('run middleware', () => {
    const result = 4
    it(`middleware change state directly`, () => {
        store.dispatch('increment')

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({num: result})
    })

    it(``, () => {
        removeMiddleware()
        removeCallback()

        store.dispatch('increment')

        expect(store.getState().num).toBe(result + 1)
        expect(store.getState()).toEqual({num: result + 1})
    })
})
