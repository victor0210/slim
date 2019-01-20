import Vue from 'vue'
import VSlim from 'vslim'
import state from './state'
import reducers from './reducers'

Vue.use(VSlim);

let store = VSlim.createStore({reducers, state});

export default store
