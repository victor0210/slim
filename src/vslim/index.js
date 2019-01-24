import Slim from '../slim/index'

let _rootComponent
let _statePrev

let slimPlugin = {
    after(state) {
        if (state !== _statePrev) _statePrev = state

        if (_rootComponent) {
            _rootComponent.$set(_rootComponent.store, 'state', state)
        }
    }
}

let devPlugin = {
    init(store) {
        store.on('__SLIM_DEVTOOL_ANSWER__', (state) => {
            store.dispatch('__SLIM_DEVTOOL_SET__', state)
        })
    }
}

const vuePlugin = {
    createStore: Slim.createStore,
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
                    ? {
                        ...options.store(),
                        state: options.store.getState()
                    }
                    : {
                        ...options.store,
                        state: options.store.getState()
                    }

                    _rootComponent = this
                setTimeout(this)
            } else if (options.parent && options.parent.store) {
                this.store = options.parent.store
            }
        }
    }
}

Slim.use(devPlugin)
Slim.use(slimPlugin)

export default vuePlugin
