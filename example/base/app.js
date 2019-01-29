// state is single object
import Slim from '../../src/slim/index'

const state = {
  count: 0
}

// reducers is event proxy
const reducers = {
  decrement: state => {
    // computed new state
    let count = state.count - 1

    // reduce new state
    return {
      ...state,
      count
    }
  },
  increment: state => {
    return {
      ...state,
      count: state.count + 1
    }
  }
}

window.store = Slim.createStore({
  reducers,
  state
})
