export const warn = window.console.warn

export const error = function (msg: string) {
    throw new Error(msg)
}
