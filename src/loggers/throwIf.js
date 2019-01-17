import {error, warn} from './util'

export const throwIf = (condition, assertion) => {
    if (condition) error(assertion)
}

export const warnIf= (condition, assertion) => {
    if (condition) warn(assertion)
}
