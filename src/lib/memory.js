import * as util from './util.js'

export const CAPACITY = 1024
export const isValidAddress = util.inRange(0, CAPACITY)
export const memory = new Array(CAPACITY).fill(0)

export const load = (bytecode) => {
  for(var i=0; i<bytecode.length; i+=2){
    let hexByte = bytecode.substr(i, 2)
    let value = util.hexToNum(hexByte)
    memory[i/2] = value
  }
}

export const setByte = (value, index) => {
  index = util.isString(index) ? util.hexToNum(index) : index  
  value = util.isString(value) ? util.hexToNum(value) : value  
  if(isValidAddress(index) && util.isByte(value))
    memory[index] = value
  else 
    throw new Error(`index ${index} or value ${value} out of range`)
  return memory
}

export const getByte = (index) => {
  index = util.isString(index) ? util.hexToNum(index) : index  
  if(isValidAddress(index))
    return memory[index] 
  else 
    throw new Error(`index ${index} or value ${value} out of range`)
}

export const setWord = (value, index) => {
  index = util.isString(index) ? util.hexToNum(index) : index  
  value = util.isString(value) ? util.hexToNum(value) : value  
  if(isValidAddress(index) && util.isWord(value)){
    memory[index] = value >> 8 & 0xff 
    memory[index + 1]  = value & 0xff
  } else 
    throw new Error(`index ${index} or value ${value} out of range`)
}

export const getWord = (index) => {
  index = util.isString(index) ? util.hexToNum(index) : index  
  if(isValidAddress(index)){
    let value = memory[index]
    value = value << 8
    return value | memory[index + 1]
  } else 
    throw new Error(`index ${index} or value ${value} out of range`)
}
