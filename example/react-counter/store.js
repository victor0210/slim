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

let store = RSlim.createStore({
  reducers, state
});

export default store
