// state is single object
import createStore from '../../src/core/createStore'

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

window.store = createStore({
  reducers,
  state
})
