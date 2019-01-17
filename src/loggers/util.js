export const warn = window.console.warn

export const error = function (msg) {
    throw new Error(msg)
}
