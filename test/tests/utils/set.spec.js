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

const store = createStore({}, {
    num: 1,
    str: str,
    obj: obj,
    arrNum: arrNum,
    arrStr: arrStr,
    arrObj: arrObj
})

const setErrorMsg = 'You may not be able to assign values ​​directly to state. Please return a new state for reducing or edit with draft in reducer.'

const state = store.getState()

const handleThrow = (assertion, fn) => {
    it(assertion, () => {
        expect(fn).toThrowError(setErrorMsg)
    });
}

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
