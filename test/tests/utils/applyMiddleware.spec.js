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
    num: 1,
    str: str,
    obj: obj,
    arrNum: arrNum,
    arrStr: arrStr,
    arrObj: arrObj
}

const store = createStore(reducers, state)

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

const unSubscribeAll = () => {
    changeNumDirectlyOff()

    changeNumReducerOff()

    changeStrDirectlyOff()

    changeStrReducerOff()

    changeObjDirectlyOff()

    changeObjReducerOff()

    changeArrDirectlyOff()

    changeArrProOff()
}
const runTest = (withEvent) => {
    // ------------------------   Num   ---------------------------
    // TODO: test warn
    it(`change num directly is allow, result should be 2`, () => {
        const s = store.getState()
        const result = withEvent ? 2 : 1
        store.dispatch('changeNumDirectly', result)

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({...s, num: result})
    })

    it(`change num with reducer is allow, result should be 3`, () => {
        const s = store.getState()
        const result = withEvent ? 3 : 1
        store.dispatch('changeNumReducer', result)

        expect(store.getState().num).toBe(result)
        expect(store.getState()).toEqual({...s, num: result})
    })

    // ------------------------   Str   ---------------------------
    // TODO: test warn
    it(`change str directly is allow, result should be str2`, () => {
        const s = store.getState()
        const result = withEvent ? 'str2' : 'str'
        store.dispatch('changeStrDirectly', result)

        expect(store.getState().str).toBe(result)
        expect(store.getState()).toEqual({...s, str: result})
    })

    it(`change str reducer is allow, result should be str3`, () => {
        const s = store.getState()
        const result = withEvent ? 'str3' : 'str'
        store.dispatch('changeStrReducer', result)

        expect(store.getState().str).toBe(result)
        expect(store.getState()).toEqual({...s, str: result})
    })

    // ------------------------   Obj   ---------------------------
    // TODO: test warn
    it(`change prop of obj directly is allow, result should be 22`, () => {
        const s = store.getState()
        const result = withEvent ? 22 : 2
        store.dispatch('changeObjDirectly', result)

        expect(store.getState().obj.num).toBe(result)
        expect(store.getState()).toEqual({...s, obj: {...obj, num: result}})
    })

    it(`change prop of obj with reducer is allow, result should be 22`, () => {
        const s = store.getState()
        const result = withEvent ? 23 : 2
        store.dispatch('changeObjReducer', result)

        expect(store.getState().obj.num).toBe(result)
        expect(store.getState()).toEqual({...s, obj: {...obj, num: result}})
    })

    // ------------------------   Arr   ---------------------------
    // TODO: test warn
    it(`change prop of arr with single variable by index is allow, result should be 22`, () => {
        const s = store.getState()
        const result = withEvent ? 1 : 11
        store.dispatch('changeArrDirectly', result)

        expect(store.getState().arrNum[0]).toBe(result)
        expect(store.getState()).toEqual({...s, arrNum: [result, 12, 13]})
    })

    it(`change prop of arr with single variable method of prototype is allow, result should be 22`, () => {
        const s = store.getState()
        const result = withEvent ? 14 : undefined
        store.dispatch('changeArrPro', result)

        expect(store.getState().arrNum[3]).toBe(result)
        expect(store.getState()).toEqual({...s, arrNum: result ? [1, 12, 13, 14] : [11, 12, 13]})
    })
}

runTest()
unSubscribeAll()
runTest()
