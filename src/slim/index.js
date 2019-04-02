import {createStore, use} from './core/createStore'
import {throwIf, warnIf} from './helpers/throwIf'
import {parse2Json} from './helpers/util'
import EventCenter from './core/eventCenter'

/*
* constants fro dev-tools of chrome
*/
const __VERSION__ = "3.0.3"
const __SLIM_DEVTOOL_INIT__ = '__SLIM_DEVTOOL_INIT__'
const __SLIM_DEVTOOL_INIT_ANSWER__ = '__SLIM_DEVTOOL_INIT_ANSWER__'
const __SLIM_DEVTOOL_ANSWER__ = '__SLIM_DEVTOOL_ANSWER__'
const __SLIM_DEVTOOL_SET__ = '__SLIM_DEVTOOL_SET__'
const __SLIM_DEVTOOL__ = '__SLIM_DEVTOOL__'

/*
* Slim will auto downgrade while browser not support Proxy
*/
const __PROXY__ = Proxy || window.Proxy
const __SICK_PROXY__ = 'Your browser not support [Proxy]. Slim will force making mode to "loose" for lib available.'

const _createStore = (__DEV__) => {
  __DEV__
    ? throwIf(!__PROXY__, __SICK_PROXY__)
    : warnIf(!__PROXY__, __SICK_PROXY__)
  /*
  * inject devtools while environment is "development"
  */

  /*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/

  function isCrushed () {
  }

  warnIf(
    __DEV__ &&
    typeof isCrushed.name === 'string' &&
    isCrushed.name !== 'isCrushed',
    'You are currently using minified code outside of NODE_ENV === "production". ' +
    'This means that you are running a slower development build of Slim. '
  )

  if (__DEV__) {
    const devtoolPlugin = {
      init (store) {
        const attach = () => {
          window.postMessage({
            version: __VERSION__,
            type: __SLIM_DEVTOOL_INIT_ANSWER__,
            state: JSON.stringify(store.state)
          }, '*')
        }

        setTimeout(() => {
          attach()
        }, 500)

        window.addEventListener('message', (e) => {
          const {type, state} = parse2Json(e.data)

          if (type === __SLIM_DEVTOOL_ANSWER__) {
            Slim.emit(__SLIM_DEVTOOL_ANSWER__, parse2Json(state))
          } else if (type === __SLIM_DEVTOOL_INIT__) {
            attach()
          }
        })
      },
      after (state, action) {
        if ([
          __SLIM_DEVTOOL_INIT__,
          __SLIM_DEVTOOL_INIT_ANSWER__,
          __SLIM_DEVTOOL_ANSWER__,
          __SLIM_DEVTOOL_SET__,
          __SLIM_DEVTOOL__
        ].indexOf(action) === -1) {
          window.postMessage({
            version: __VERSION__,
            type: __SLIM_DEVTOOL__,
            state: JSON.stringify(state),
            actionType: action
          }, '*')
        }
      }
    }

    use(devtoolPlugin)
  }

  return createStore
}

let {on, off, emit} = EventCenter

/*
* combine apis of EventCenter and SlimStore
*/
const Slim = {
  __VERSION__,
  createStore: (opts) => {_createStore(opts.dev)},
  use,
  on,
  off,
  emit
}

export default Slim
