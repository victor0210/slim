import {error} from './util'

export default function throwIf(condition: boolean, assertion: string) {
    if (condition) error(assertion)
}