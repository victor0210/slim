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

let store = slim.createStore({
    increment: (draft) => {
        draft.count++;
    },
    decrement: (draft) => {
        return {
            ...draft,
            count: draft.count - 1
        }
    }
}, state);

export default store
