// memory 
// 0x0 programCounter

import * as util from './util.js'
import * as memory from './memory.js'

// CONSTANTS
export const WORD_SIZE = 2

// STATE
export let HALTED = false
export let PC = 0x00
export const REGISTERS = { A: 0, B: 0, C: 0, D: 0 }

// HELPERS
// TODO: Constant and Pointer length should be option and upto 4 bytes
export const isRegister = (value) => new RegExp('^[A-D]$').test(value)
export const isConstant = (value) => new RegExp('^[a-f0-9]{1,4}$').test(value)
export const isPointer = (value) => new RegExp('^x[a-f0-9]{1,4}$').test(value)

export const cpuType = (SRC) => {
  if(isRegister(SRC)) return 'REGISTER'
  if(isPointer(SRC)) return 'POINTER'
  if(isConstant(SRC)) return 'CONSTANT'
  throw new Error('toValue error SRC unsuported')
}

export const toValue = (SRC) => {
  if(util.isNum(SRC)) return SRC
  if(isRegister(SRC)) return REGISTERS[SRC]
  if(isPointer(SRC)) return memory.get(SRC.substr(1))
  if(isConstant(SRC)) return util.hexToNum(SRC)
  throw new Error('toValue error SRC unsuported')
}

// expects a number
export const setRegister = (num, reg) => {
  REGISTERS[reg] = util.limit(0, 0xffff, num)
}

// INSTRUCTIONS
export const MOV = (SRC, DST) => {
  if(isRegister(DST)) setRegister(toValue(SRC), DST)
  if(isPointer(DST)) memory.set(toValue(SRC), DST.substr(1))
}

export const ADD = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal + sVal, DST)
}

export const SUB = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal - sVal, DST)
}

export const MOD = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal % sVal, DST)
}

export const SR = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal >> sVal, DST)
}

export const SL = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal << sVal, DST)
}

export const AND = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal & sVal, DST)
}

export const OR = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal | sVal, DST)
}

export const XOR = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  MOV(dVal ^ sVal, DST)
}

export const LOG = (SRC) => {
  console.log(`${cpuType(SRC)} (${SRC}): ${toValue(SRC)}`) 
}

export const JMP = (DST) => {
   PC = util.limit(0, memory.CAPACITY, toValue(DST))
}

export const JEQ = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA) 
  let bVal = toValue(SRCB) 
  if(aVal === bVal)
    PC = util.limit(0, memory.CAPACITY, toValue(DST))
}

export const JLT = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA) 
  let bVal = toValue(SRCB) 
  if(aVal < bVal)
    PC = util.limit(0, memory.CAPACITY, toValue(DST))
}

export const JGT = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA) 
  let bVal = toValue(SRCB) 
  if(aVal > bVal)
    PC = util.limit(0, memory.CAPACITY, toValue(DST))
}

export const RANDW = (DST) => {
  MOV(util.rand(0xffff), DST)
}

export const RANDB = (DST) => {
  MOV(util.rand(0xff), DST)
}

export const NOP = () => {}

// TODO: IN, OUT, PUSH, POP, CALL, RET, INTR, HALT
// TODO: COMPLIER 
// TODO: RUNTIME (clock)
// TODO: IMPLMENT DEVICES (LCD, BUZZER, MEMORY_POKER)
