import {createStore} from '../../../src/index'

const getDefaultState = () => {
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

    const stateBase = {
        num: 1,
        str: str,
        obj: obj,
        arrNum: arrNum,
        arrStr: arrStr,
        arrObj: arrObj
    }

    return JSON.parse(JSON.stringify(stateBase))
}

const setErrorMsg = 'You may not be able to assign values ​​directly to state. Please return a new state for reducing or edit with draft in reducer.'
const createErrorMsg = 'type of state expect to [Object] but got [number]'

const handleThrow = (assertion, fn) => {
    it(assertion, () => {
        expect(fn).toThrowError(setErrorMsg)
    });
}

const handleThrowNone = (assertion, fn) => {
    it(assertion, () => {
        expect(fn()).toBe(undefined)
    });
}

it(`parameters with store creating should be a plainObject`, () => {
    const validateFn = () => {
        createStore({
            reducers: 1,
            state: 1
        })
    }
    expect(validateFn).toThrowError(createErrorMsg)
});

describe('change state in array with some ways is allow', () => {
    const store = createStore({
        reducers: {},
        state: getDefaultState(),
        mode: "standard"
    })

    const state = store.getState()

    handleThrow('num should be readonly', () => {state.num = 1})
    handleThrow('str should be readonly', () => {state.str = 1})
    handleThrow('obj should be readonly', () => {state.obj = 1})
    handleThrow('obj str should be readonly', () => {state.obj.str = 1})
    handleThrow('arrNum should be readonly', () => {state.arrNum = 1})
    handleThrow('arrStr should be readonly', () => {state.arrStr = 1})
    handleThrow('arrObj should be readonly', () => {state.arrObj = 1})

    handleThrowNone('arrObj should be readonly', () => {state.arrObj[0].name = 1})
    handleThrowNone('arr push not allow', () => {state.arrNum.push(1)})
    handleThrowNone('obj not allow to add new key', () => {state.obj.newkey = 1})
})

describe('change state is not allow with strict', () => {
    const store = createStore({
        reducers: {},
        state: getDefaultState()
    })

    const state = store.getState()

    handleThrow('num should be readonly', () => {state.num = 1})
    handleThrow('str should be readonly', () => {state.str = 1})
    handleThrow('obj should be readonly', () => {state.obj = 1})
    handleThrow('obj str should be readonly', () => {state.obj.str = 1})
    handleThrow('arrNum should be readonly', () => {state.arrNum = 1})
    handleThrow('arrStr should be readonly', () => {state.arrStr = 1})
    handleThrow('arrObj should be readonly', () => {state.arrObj = 1})
    handleThrow('arrObj should be readonly', () => {state.arrObj[0].name = 1})
    handleThrow('arr push not allow', () => {state.arrNum.push(1)})
    handleThrow('obj not allow to add new key', () => {state.obj.newkey = 1})
})

describe('change state is all allow in mode loose', () => {
    const store = createStore({
        reducers: {},
        state: getDefaultState(),
        mode: "loose"
    })

    const state = store.getState()

    handleThrowNone('num should be readonly', () => {state.num = 1})
    handleThrowNone('num should be readonly', () => {state.num = 1})
    handleThrowNone('str should be readonly', () => {state.str = 1})
    handleThrowNone('obj should be readonly', () => {state.obj = {}})
    handleThrowNone('obj str should be readonly', () => {state.obj.str = 1})
    handleThrowNone('arrNum should be readonly', () => {state.arrNum = []})
    handleThrowNone('arrStr should be readonly', () => {state.arrStr = []})
    handleThrowNone('arrObj should be readonly', () => {state.arrObj = [{}]})
    handleThrowNone('arrObj should be readonly', () => {state.arrObj[0].name = 1})
    handleThrowNone('arr push not allow', () => {state.arrNum.push(1)})
    handleThrowNone('obj not allow to add new key', () => {state.obj.newkey = 1})
})
