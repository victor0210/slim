import RSlim from 'rslim'
import state from './state'
import reducers from './reducers'

let store = RSlim.createStore({reducers, state});

export default store
