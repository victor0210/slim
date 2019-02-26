// state is single object
import Slim from '../../src/slim/index'

const state = {
  count: 0
}

// reducers is event proxy
const reducers = {
  decrement: (state, decrementNum) => {
    // computed new state
    let count = state.count - (decrementNum || 1)

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

const actions = {
  increment: ({commit}, ...args) => {
    console.log('track in actions')

    commit('increment', ...args)
  },
  decrement ({commit}) {
    sleeper()
      .then(decrementNum => commit('decrement', decrementNum))
  }
}

const sleeper = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  })
}

const plugin = {
  after(state) {
    renderCount(state.count)
  }
}

window.store = Slim.createStore({
  reducers,
  actions,
  state,
  plugin: [plugin]
})

window.Slim = Slim
