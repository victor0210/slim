import {error, warn} from './util'

export const throwIf = (condition: boolean, assertion: string) => {
    if (condition) error(assertion)
}

export const warnIf= (condition: boolean, assertion: string) => {
    if (condition) warn(assertion)
}
