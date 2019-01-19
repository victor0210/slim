import {createStore} from '../../../src/index'

const str = 'str'
const strInObj = 'strinobj'
const arrNum = [11, 12, 13]
const arrStr = ['str1', 'str2', 'str3']
const arrObj = [{name: 'objInArr1'}, {name: 'objInArr2'}, {name: 'objInArr3'}]

const obj = {
    num: 2,
    str: strInObj,
    objInObj: {
        str: 'str in obj-2'
    },
    arrNumInObj: [21, 22, 23],
    arrStrInObj: ['str1InObj', 'str2InObj', 'str3InObj']
}

const reducers = {}

const state = {
    num: 0,
    str: str,
    obj: obj,
    arrNum: arrNum,
    arrStr: arrStr,
    arrObj: arrObj
}

const store = createStore({
    reducers,
    state
})

const changeNumDirectlyOff = store.subscribe('changeNumDirectly', (draft, num) => {
    draft.num = num
})

const changeNumReducerOff = store.subscribe('changeNumReducer', (draft, num) => {
    return {
        ...draft,
        num
    }
})

const changeStrDirectlyOff = store.subscribe('changeStrDirectly', (draft, str) => {
    draft.str = str
})

const changeStrReducerOff = store.subscribe('changeStrReducer', (draft, str) => {
    return {
        ...draft,
        str
    }
})

const changeObjDirectlyOff = store.subscribe('changeObjDirectly', (draft, v) => {
    draft.obj.num = v
})

const changeObjReducerOff = store.subscribe('changeObjReducer', (draft, v) => {
    return {
        ...draft,
        obj: {
            ...draft.obj,
            num: v
        }
    }
})

const changeArrDirectlyOff = store.subscribe('changeArrDirectly', (draft, v) => {
    draft.arrNum[0] = v
})

const changeArrProOff = store.subscribe('changeArrPro', (draft, v) => {
    draft.arrNum.push(v)
})

// ------------------------   Num   ---------------------------
// TODO: test warn
describe('change num directly', () => {
    const result = 2

    it(`change num directly is allow, result should be 2`, () => {
        const s = store.getState()
        store.dispatch('changeNumDirectly', result)

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({...s, num: result})
    })

    it(`change num directly is allow, result should be 2`, () => {
        const s = store.getState()
        changeNumDirectlyOff()
        store.dispatch('changeNumDirectly', 10)

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({...s, num: result})
    })
})

describe('change num reducer', () => {
    const result = 4

    it(`change num with reducer is allow, result should be 4`, () => {
        const s = store.getState()
        store.dispatch('changeNumReducer', result)

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({...s, num: result})
    })

    it(`change num with reducer is allow, result should be 4`, () => {
        const s = store.getState()
        changeNumReducerOff()
        store.dispatch('changeNumReducer', 12)

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({...s, num: result})
    })
})

describe('change str directly', () => {
    const result = 'str2'

    it(`change str directly is allow, result should be str2`, () => {
        const s = store.getState()
        store.dispatch('changeStrDirectly', result)

        expect(store.getState().str).toBe(result)
        expect(store.getState()).toEqual({...s, str: result})
    })


    it(`change str directly is allow, result should be str2`, () => {
        const s = store.getState()
        changeStrDirectlyOff()
        store.dispatch('changeStrDirectly', 'abc')

        expect(store.getState().str).toBe(result)
        expect(store.getState()).toEqual({...s, str: result})
    })
})

describe('change str reducer', () => {
    const result = 'str3'

    it(`change str reducer is allow, result should be str3`, () => {
        const s = store.getState()
        store.dispatch('changeStrReducer', result)

        expect(store.getState().str).toBe(result)
        expect(store.getState()).toEqual({...s, str: result})
    })

    it(`change str reducer is allow, result should be str3`, () => {
        const s = store.getState()
        changeStrReducerOff()
        store.dispatch('changeStrReducer', 'abcde')

        expect(store.getState().str).toBe(result)
        expect(store.getState()).toEqual({...s, str: result})
    })
})

describe('change obj directly', () => {
    const result = 22
    it(`change prop of obj directly is allow, result should be 22`, () => {
        const s = store.getState()
        store.dispatch('changeObjDirectly', result)

        expect(store.getState().obj.num).toBe(result)
        expect(store.getState()).toEqual({...s, obj: {...obj, num: result}})
    })

    it(`change prop of obj directly is allow, result should be 22`, () => {
        const s = store.getState()
        changeObjDirectlyOff()
        store.dispatch('changeObjDirectly', 'abccc')

        expect(store.getState().obj.num).toBe(result)
        expect(store.getState()).toEqual({...s, obj: {...obj, num: result}})
    })
})

describe('change obj reducer', () => {
    const result = 23
    it(`change prop of obj with reducer is allow, result should be 22`, () => {
        const s = store.getState()
        store.dispatch('changeObjReducer', result)

        expect(store.getState().obj.num).toBe(result)
        expect(store.getState()).toEqual({...s, obj: {...obj, num: result}})
    })

    it(`change prop of obj with reducer is allow, result should be 22`, () => {
        const s = store.getState()
        changeObjReducerOff()
        store.dispatch('changeObjReducer', result)

        expect(store.getState().obj.num).toBe(result)
        expect(store.getState()).toEqual({...s, obj: {...obj, num: result}})
    })
})

describe('change arr directly', () => {
    const result = 1
    it(`change prop of arr with single variable by index is allow, result should be 22`, () => {
        const s = store.getState()
        store.dispatch('changeArrDirectly', result)

        expect(store.getState().arrNum[0]).toBe(result)
        expect(store.getState()).toEqual({...s, arrNum: [result, 12, 13]})
    })

    it(`change prop of arr with single variable by index is allow, result should be 22`, () => {
        const s = store.getState()
        changeArrDirectlyOff()

        store.dispatch('changeArrDirectly', result)

        expect(store.getState().arrNum[0]).toBe(result)
        expect(store.getState()).toEqual({...s, arrNum: [result, 12, 13]})
    })
})

describe('change arr reducer', () => {

    const result = 14
    it(`change prop of arr with single variable method of prototype is allow, result should be 22`, () => {
        const s = store.getState()
        store.dispatch('changeArrPro', result)

        expect(store.getState().arrNum[3]).toBe(result)
        expect(store.getState()).toEqual({...s, arrNum: [1, 12, 13, 14]})
    })

    it(`change prop of arr with single variable method of prototype is allow, result should be 22`, () => {
        changeArrProOff()
        const s = store.getState()
        store.dispatch('changeArrPro', result)

        expect(store.getState().arrNum[3]).toBe(result)
        expect(store.getState()).toEqual({...s, arrNum: [1, 12, 13, 14]})

        // test unsubscribe multiple
        changeArrProOff()
    })
})
