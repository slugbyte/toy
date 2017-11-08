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
export const set = (key, value) => (collection) => {...collection, [key]:value}
export const del = (key) => (collection) => {
  let result = {...collection}
  delete result[key]
  return result
}

// math
export const inRange = (min, max) => (value) => value > min && value < max
export const inURange = (max) => inRange(-1, max)

export const in8 = inURange(8)
export const in16 = inURange(16)
export const in32 = inURange(32)
export const in64 = inURange(64)
export const in128 = inURange(128)
export const in256 = inURange(256)
export const in512 = inURange(512)
export const in1024 = inURange(1024)

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

export const numToHex  = (num) => Number(num).toString(16) 
export const hexToNum = (hex) => parseInt(hex, 16)

export const rand = (max) => Math.floor(Math.random() * max)
export const rand8 = () => rand(8)
export const rand16 = () => rand(16)
export const rand32 = () => rand(32)
export const rand64 = () => rand(64)
export const rand128 = () => rand(128)
export const rand256 = () => rand(256)
export const rand512 = () => rand(512)
export const rand1024 = () => rand(1024)
