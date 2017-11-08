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
export const isRegister = (value) => /[A-D]/.test(value)
export const isConstant = (value) => /[a-f0-9][a-f0-9]/.test(value)
export const isPointer = (value) => /x[a-f0-9][a-f0-9]/.test(value)

export const toHexByte = (value) => {
}

export const toHexWord = (value) => {
}

export const toValue = (SRC) => {
  if(isRegister(SRC)) return REGISTERS[SRC]
  if(isPointer(SRC)) return memory.get(SRC.substr(1))
  if(isConstant(SRC)) return util.hexToNum(SRC)
  throw new Error('toValue error SRC unsuported')
}

// INSTRUCTIONS
export const MOV = (SRC, DST) => {
  if(isRegister(DST)) REGISTERS[DST] = toValue(SRC)
  if(isPointer(DST)) memory.set(toValue(SRC), DST.substr(1))
}

export const ADD = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  let result = util.hexByte(dVal + sVal)
  MOV(result, DST)
}

export const SUB = (SRC, DST) => {
  let sVal = toValue(SRC)
  let dVal = toValue(DST)
  let result = util.hexByte(dVal - sVal)
  MOV(result, DST)
}

export const JMP = (DST) => {
   PC = Math.min(Math.max(toValue(DST), 0), memory.CAPACITY -1)
}

export const NOP = () => {}

// TODO: NOP, JLT, JGT, JEQ, IN, 
//       OUT, MOD, SR, SL, PUSH, 
//       POP, CALL, RET, AND, OR, 
//       XOR, INTR, HALT, LOG, RAND
// TODO: COMPLIER 
// TODO: RUNTIME (clock)
// TODO: IMPLMENT DEVICES (LCD, BUZZER, MEMORY_POKER)
