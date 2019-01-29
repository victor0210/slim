import RSlim from 'rslim'

let state = {
    count: 0,
    str: "Hello Slim!",
    arr: [],
    obj: {
        obj: {
            obj: 0
        }
    }
};

const reducers = {
    increment: (state) => {
        state.count++;
    },
    decrement: (state) => {
        state.count--
    }
}

const getters = {
    evenOrOdd: (state) => {
        return state.count % 2 === 0 ? 'Even' : 'Odd'
    }
}

let store = RSlim.createStore({
  reducers, state, getters
});

export default store
