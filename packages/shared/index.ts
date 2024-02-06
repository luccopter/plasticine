
export const isObject = (val: any) => {
    const type = typeof val
    return type !== null && (type === 'object' || type === 'function')
}
const toString = Object.prototype.toString
export const getTag = (val: any) => {
    if (val === null) {
        return val === undefined ? '[Object undefinded]' : '[Object null]'
    }
    return toString.call(val)
}
export const extend = (target: Object, src: Object) => {
    return Object.assign(target, src)
}

export const isArray = (val: any) => {
    return Array.isArray(val)
}

export const copyArray = (source: Array<any>,  target: Array<any>) => {
    let index = -1
    const { length } = source
    while(++index < length) {
        target[index] = source[index]
    }
    return target
}
