import createStore from './core/createStore'
import {warnIf} from "./loggers/throwIf"

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {
}

warnIf(
    process.env.NODE_ENV !== 'production' &&
    typeof isCrushed.name === 'string' &&
    isCrushed.name !== 'isCrushed',
    'You are currently using minified code outside of NODE_ENV === \'production\'. ' +
    'This means that you are running a slower development build of Slim. '
)

export {
    createStore
}
