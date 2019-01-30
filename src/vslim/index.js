import Slim from 'slim-store'

let _rootComponent

let slimPlugin = {
    init(store) {
        // integrate slim-devtools
        Slim.on('__SLIM_DEVTOOL_ANSWER__', (state) => {
            store.dispatch('__SLIM_DEVTOOL_SET__', state)
        })
    },
    beforeSet(target, property, value) {
      if (
        _rootComponent &&
        (
          !target.hasOwnProperty(property) ||
          Array.isArray(value) ||
          Object.prototype.toString.call(value) === '[object Object]'
        )
      ) {
        // patch for vue of observing new key
        // when the value is an new array or a new key of object and array
        // observe new val by vueComponent.$set
        _rootComponent.$set(target, property, value)
      }
    }
}

const {createStore, use, on, emit, off} = Slim

// patch of __proto__ in Vue because it make some hooks on array
const setterValidator = (target, property) => property === '__proto__'
const customSetter = (target, property, value, receiver, defaultSetter) => {
  return (property === '__proto__')
    ? Reflect.set(target, property, value, receiver)
    : defaultSetter()
}

// rewrite setterValidator & customSetter
const _createStore = (spec) => createStore(Object.assign(spec, {setterValidator, customSetter}))

const VSlim = {
    createStore: _createStore,
    use,
    on,
    emit,
    off,
    install: function (Vue) {
        const version = Number(Vue.version.split('.')[0])

        if (version >= 2) {
            Vue.mixin({
                created: slimInit,
                data() {
                    return {
                        store: null
                    }
                }
            })
        } else {
            // override init and inject vslim init procedure
            // for 1.x backwards compatibility.
            const _init = Vue.prototype._init
            Vue.prototype._init = function (options = {}) {
                options.init = options.init
                    ? [slimInit].concat(options.init)
                    : slimInit
                _init.call(this, options)
            }
        }

        function slimInit() {
            const options = this.$options
            // store injection
            if (options.store) {
                this.store = typeof options.store === 'function'
                    ? options.store()
                    : options.store

                _rootComponent = this
            } else if (options.parent && options.parent.store) {
                this.store = options.parent.store
            }
        }
    }
}

Slim.use(slimPlugin)

export default VSlim
