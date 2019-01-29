import {createStore, use} from './core/createStore'
import {warnIf} from './helpers/throwIf'
import {parse2Json} from './helpers/util'
import EventCenter from './core/eventCenter'

const __VERSION__ = require('./package.json').version
const __DEV__ = process.env.NODE_ENV !== 'production'
const __SLIM_DEVTOOL_INIT__ = '__SLIM_DEVTOOL_INIT__'
const __SLIM_DEVTOOL_INIT_ANSWER__ = '__SLIM_DEVTOOL_INIT_ANSWER__'
const __SLIM_DEVTOOL_ANSWER__ = '__SLIM_DEVTOOL_ANSWER__'
const __SLIM_DEVTOOL_SET__ = '__SLIM_DEVTOOL_SET__'
const __SLIM_DEVTOOL__ = '__SLIM_DEVTOOL__'

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

const _createStore = () => {
  if (__DEV__) {
    const devtoolPlugin = {
      init (store) {
        const attach = () => {
          window.postMessage({
            version: __VERSION__,
            type: __SLIM_DEVTOOL_INIT_ANSWER__,
            state: JSON.stringify(store.getState())
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

const Slim = {
  __VERSION__,
  createStore: _createStore(),
  use,
  on,
  off,
  emit
}

export default Slim
