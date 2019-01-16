export const isPlainObject = (obj: any) => {
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(obj) === proto
}

export const isPlainString = (obj: any) => {
    return typeof obj === 'string'
}
