import * as util from './util.js'

export const CAPACITY = 1024

export const memory = new Array(CAPACITY).fill(0)

const subscribers = []

export const subscribe = (cb) => {
  subscribers.push(cb)
}

export const load = (bytecode) => {
  for(var i=0; i<bytecode.length; i+=2){
    let hexByte = bytecode.substr(i, 2)
    let value = util.hexToNum(hexByte)
    memory[i/2] = value
  }
}

export const set = (value, index) => {
  index = util.isString(index) ? util.hexToNum(index) : index  
  value = util.isString(value) ? util.hexToNum(value) : value  

  util.log({index, value})

  if(util.in1024(index) && util.in256(value))
    memory[index] = value
  else 
    throw new Error(`index ${index} or value ${value} out of range`)
  subscribers.forEach(cb => cb(memory))
  return memory
}

export const get = (index) => {
  index = util.isString(index) ? util.hexToNum(index) : index  
  if(util.in1024(index))
    return memory[index] 
  else 
    throw new Error(`index ${index} or value ${value} out of range`)
}

