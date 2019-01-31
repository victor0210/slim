export const mapGetters = (getters) => {
  let res = {}

  getters.forEach(key => {
    res[key] = function () {
      return this.store.getGetter(key)
    }
  })

  return res
}

export const mapDispatchers = (dispatchers) => {
  let res = {}

  dispatchers.forEach(key => {
    res[key] = function (...args) {
      return this.store.dispatch(key, ...args)
    }
  })

  return res
}

const getState = (state, key) => state[key]
export const mapState = (state) => {
  let res = {}

  state.forEach(key => {
    res[key] = function () {
      return getState(this.store.state, key)
    }
  })

  return res
}
