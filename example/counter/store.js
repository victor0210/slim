import Vue from 'vue'
import slim from 'vslim'

Vue.use(slim)

let state = {
    count: 0,
    arr: [1, 2, 3],
    obj: {
        k1: 'k1',
        k2: 'k2'
    }
}

let store = slim.createStore({
    increment: (state) => {
        return {
            ...state,
            count: state.count + 1
        }
    },
    decrement: (state) => {
        return {
            ...state,
            count: state.count - 1
        }
    },
    addToArr: (state, num) => {
        return {
            ...state,
            arr: [...state.arr, num]
        }
    }
}, state)

export default store
