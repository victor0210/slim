import Slim from '../../../src/slim'

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

const reducers = {
    // num
    changeNumDirectly: (state, num) => {
        state.num = num
    },
    changeNumReducer: (state, num) => {
        return {
            ...state,
            num
        }
    },

    // str
    changeStrDirectly: (state, str) => {
        state.str = str
    },
    changeStrReducer: (state, str) => {
        return {
            ...state,
            str
        }
    },

    // obj
    changeObjDirectly: (state, v) => {
        state.obj.num = v
    },
    changeObjReducer: (state, v) => {
        return {
            ...state,
            obj: {
                ...state.obj,
                num: v
            }
        }
    },

    // arr
    changeArrDirectly: (state, v) => {
        state.arrNum[0] = v
    },
    changeArrPro: (state, v) => {
        state.arrNum.push(v)
    },
}

const state = {
    num: 1,
    str: str,
    obj: obj,
    arrNum: arrNum,
    arrStr: arrStr,
    arrObj: arrObj
}

const store = Slim.createStore({
    reducers,
    state
})

// ------------------------   Num   ---------------------------
// TODO: test warn
it(`change num directly is allow, result should be 2`, () => {
    const s = store.state
    store.dispatch('changeNumDirectly', 2)

    expect(store.state.num).toBe(2)
    expect(store.state).toEqual({...s, num: 2})
})

it(`change num with reducer is allow, result should be 3`, () => {
    const s = store.state
    store.dispatch('changeNumReducer', 3)

    expect(store.state.num).toBe(3)
    expect(store.state).toEqual({...s, num: 3})
})

// ------------------------   Str   ---------------------------
// TODO: test warn
it(`change str directly is allow, result should be str2`, () => {
    const s = store.state
    store.dispatch('changeStrDirectly', 'str2')

    expect(store.state.str).toBe('str2')
    expect(store.state).toEqual({...s, str: 'str2'})
})

it(`change str reducer is allow, result should be str3`, () => {
    const s = store.state
    store.dispatch('changeStrReducer', 'str3')

    expect(store.state.str).toBe('str3')
    expect(store.state).toEqual({...s, str: 'str3'})
})

// ------------------------   Obj   ---------------------------
// TODO: test warn
it(`change prop of obj directly is allow, result should be 22`, () => {
    const s = store.state
    store.dispatch('changeObjDirectly', 22)

    expect(store.state.obj.num).toBe(22)
    expect(store.state).toEqual({...s, obj: {...obj, num: 22}})
})

it(`change prop of obj with reducer is allow, result should be 22`, () => {
    const s = store.state
    store.dispatch('changeObjReducer', 23)

    expect(store.state.obj.num).toBe(23)
    expect(store.state).toEqual({...s, obj: {...obj, num: 23}})
})

// ------------------------   Arr   ---------------------------
// TODO: test warn
it(`change prop of arr with single variable by index is allow, result should be 22`, () => {
    const s = store.state
    store.dispatch('changeArrDirectly', 1)

    expect(store.state.arrNum[0]).toBe(1)
    expect(JSON.stringify(store.state)).toEqual(JSON.stringify({...s, arrNum: [1, 12, 13]}))
})

it(`change prop of arr with single variable method of prototype is allow, result should be 22`, () => {
    const s = store.state
    store.dispatch('changeArrPro', 14)

    expect(store.state.arrNum[3]).toBe(14)
    expect(JSON.stringify(store.state)).toEqual(JSON.stringify({...s, arrNum: [1, 12, 13, 14]}))
})
