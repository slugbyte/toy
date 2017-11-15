// debuging
export const log = console.log
export const error = console.error

// typechecks
export const isNum = (value) => typeof value === 'number'
export const isBool= (value) => typeof value === 'boolean'
export const isObject = (value) => typeof value === 'object'
export const isString = (value) => typeof value === 'string'
export const isFunction = (value) => typeof value === 'function'
export const isArray = (value) => Array.isArray(value)

// function
export const partial = (fn, ...defautls) => (...args) => fn(...defaults, ...args)
export const partialRight = (fn, ...defautls) => (...args) => fn(...args, ...defaults)
export const compose = (...fns) => (arg) => fns.reduce((result, fn) => fn(result), arg)

export const throttle = (fn, ms) => {
  let ready = true;
  return (...args) => {
    if(ready){
      ready = false
      setTimeout(() => ready = true, ms)
      return fn(...args)
    }
  }
}

export const debounce = (fn, ms) => {
  let timeout;
  return (...args) => {
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      fn(...args)
    }, ms)
  }
}

// lists
export const reduce = (cb) => (collection) => Array.prototype.reduce.call(collection, cb)
export const filter = (cb) => (collection) => Array.prototype.filter.call(collection, cb)
export const concat = (cb) => (collection) => Array.prototype.concat.call(collection, cb)
export const slice = (cb) => (collection) => Array.prototype.slice.call(collection, cb)
export const map = (cb) => (collection) => Array.prototype.map.call(collection, cb)
export const append = (data) => (collection) => [...collection, data]
export const prepend = (data) => (collection) => [data, ...collection]

// maps
export const get = (key) => (collection) => collection[key]

export const set = (key, value) => (collection) => ({...collection, [key]:value})

export const del = (key) => (collection) => {
  let result = {...collection}
  delete result[key]
  return result
}

// math
export const inRange = (min, max) => (value) => value >= min && value <= max
export const isByte = inRange(0, 0xff)
export const isWord = inRange(0, 0xffff)

export const limit = (min, max, value) => Math.max(min, Math.min(max, value))

export const add = (a) => (b) => b + a
export const sub = (a) => (b) => b - a
export const mul = (a) => (b) => b * a
export const div = (a) => (b) => b / a
export const mod = (a) => (b) => b % a
export const and = (a) => (b) => b & a
export const or = (a) => (b) => b | a
export const xor = (a) => (b) => b ^ a
export const left = (a) => (b) => b << a
export const right = (a) => (b) => b >> a

export const eq = (a) => (b) => b === a
export const lt = (a) => (b) => b < a
export const gt = (a) => (b) => b > a

export const numToHex = (num) => Number(num).toString(16) 
export const hexToNum = (hex) => parseInt(hex, 16)
export const numToBinary = (num) => Number(num).toString(2)
export const binaryToNum = (binary) => parseInt(binary, 2)

export const toPadedHex = (pad) => (value) => {
  value = isString(value) ? hexToNum(value) : value
  value = Math.max(value, 0)
  let hex = numToHex(value).substr(0, pad)
  let zeros = new Array(pad - hex.length).fill(0).join('')
  return zeros + hex
}

export const toHexByte = toPadedHex(2)
export const toHexWord = toPadedHex(4)

export const rand = (max) => Math.floor(Math.random() * max)
