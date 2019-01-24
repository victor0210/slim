import Vue from 'vue'
import VSlim from 'vslim'

Vue.use(VSlim);

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

let store = VSlim.createStore({
  reducers, state
});

export default store
