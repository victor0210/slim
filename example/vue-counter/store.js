import Vue from 'vue'
import slim from 'vslim'

Vue.use(slim);

let state = {
    count: 0,
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

let store = slim.createStore({
  reducers, state
});

export default store
