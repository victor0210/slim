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
        num: 3,
        str: 'str in obj-2',
        objInObj2: {},
        arrNumInObj: [31, 32, 33],
        arrStrInObj: ['str1InObj-2', 'str2InObj-2', 'str3InObj-2']
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

describe('mode strict should all visitable', () => {
    const store = createStore({}, stateBase)

    const state = store.getState()

    const toBe = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toBe(result)
        });
    }
    const toEqual = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toEqual(result)
        });
    }

    toBe('num should be 1', state.num, 1)
    toBe('str should be \"str in obj\"', state.str, str)
    toEqual('obj should be \"obj\"', state.obj, obj)
    toEqual('arrNum should be [11, 12, 13]]', state.arrNum, arrNum)
    toEqual('arrStr should be [\'str1\', \'str2\', \'str3\']', state.arrStr, arrStr)
    toEqual('arrObj should be [{name: \'objInArr1\'}, {name: \'objInArr2\'}, {name: \'objInArr3\'}]', state.arrObj, arrObj)
})

describe('mode strict should all visitable', () => {
    const store = createStore({}, stateBase, "standard")

    const state = store.getState()

    const toBe = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toBe(result)
        });
    }
    const toEqual = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toEqual(result)
        });
    }

    toBe('num should be 1', state.num, 1)
    toBe('str should be \"str in obj\"', state.str, str)
    toEqual('obj should be \"obj\"', state.obj, obj)
    toEqual('arrNum should be [11, 12, 13]]', state.arrNum, arrNum)
    toEqual('arrStr should be [\'str1\', \'str2\', \'str3\']', state.arrStr, arrStr)
    toEqual('arrObj should be [{name: \'objInArr1\'}, {name: \'objInArr2\'}, {name: \'objInArr3\'}]', state.arrObj, arrObj)
})

describe('mode strict should all visitable', () => {
    const store = createStore({}, stateBase, "loose")

    const state = store.getState()

    const toBe = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toBe(result)
        });
    }
    const toEqual = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toEqual(result)
        });
    }

    toBe('num should be 1', state.num, 1)
    toBe('str should be \"str in obj\"', state.str, str)
    toEqual('obj should be \"obj\"', state.obj, obj)
    toEqual('arrNum should be [11, 12, 13]]', state.arrNum, arrNum)
    toEqual('arrStr should be [\'str1\', \'str2\', \'str3\']', state.arrStr, arrStr)
    toEqual('arrObj should be [{name: \'objInArr1\'}, {name: \'objInArr2\'}, {name: \'objInArr3\'}]', state.arrObj, arrObj)
})
