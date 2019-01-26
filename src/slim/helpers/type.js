export const isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isPlainString = (obj) => {
    return typeof obj === 'string'
}
