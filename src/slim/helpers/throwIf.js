export const error = function (msg) {
    throw new Error(msg)
}

export const warn = window.console.warn

export const throwIf = (condition, assertion) => {
    if (condition) error(assertion)
}

export const warnIf= (condition, assertion) => {
    if (condition) warn(assertion)
}
