// memory 
// 0x0 programCounter
import * as util from './util.js'
import * as memory from './memory.js'

// CONSTANTS
export const WORD_SIZE = 2

// USED FOR INDEXING WHEN PARSING AND EXECUTING
export const _REGISTERS = ['P', 'A', 'B', 'C', 'D', 'I']
export const _TYPES = [
  'INSTRUCTION', 'CONSTANT', 'REGISTER', 'POINTER', 'PIN', 'VARIABLE',
]
export const _INSTRUCTIONS = [ 
  'NOP', 'MOV', 'ADD', 'SUB', 'MOD', 'SL', 'SR', 'AND', 'XOR', 'OR', 'JMP', 
  'JEQ', 'JLT', 'JGT', 'INTR', 'HALT', 'LOG', 'RANDW', 'RANDB', 'IN', 'OUT',
] 

// STATE
export let HALTED = false
export const REGISTERS = { A: 0, B: 0, C: 0, D: 0 , I: 0, P: 0 }
export const PINS = new Array(100).fill(0)

// HELPERS
// TODO: Constant and Pointer length should be option and upto 4 bytes
export const isRegister = (value) => new RegExp('^[A-D]$').test(value)
export const isConstant = (value) => new RegExp('^[a-f0-9]{1,4}$').test(value)
export const isPointer = (value) => new RegExp('^x[a-f0-9]{1,4}$').test(value)
export const isPin = (value) => new RegExp('^#[a-f0-9]{1,4}$').test(value)
export const isLabel = (value) => new RegExp('^_[a-z_]+$').test(value)
export const isInstruction = (value) => _INSTRUCTIONS.includes(value)

export const cpuType = (SRC) => {
  if(isPin(SRC)) return 'PIN'
  if(isLabel(SRC)) return 'LABEL'
  if(isPointer(SRC)) return 'POINTER'
  if(isConstant(SRC)) return 'CONSTANT'
  if(isRegister(SRC)) return 'REGISTER'
  if(isInstruction(SRC)) return 'INSTRUCTION'
  if(SRC.trim() === '') return 'BLANK'
  throw new Error(`toValue error SRC (${SRC}) unsuported`)
}

export const toValue = (SRC) => {
  if(util.isNum(SRC)) return SRC
  if(isRegister(SRC)) return REGISTERS[SRC]
  if(isPointer(SRC)) return memory.getByte(SRC.substr(1))
  if(isConstant(SRC)) return util.hexToNum(SRC)
  throw new Error('toValue error SRC unsuported')
}

export const setRegister = (num, reg) => {
  REGISTERS[reg] = util.limit(0, 0xffff, num)
}


// INSTRUCTIONS
export const MOV = (SRC, DST) => {
  if(isRegister(DST)) setRegister(toValue(SRC), DST)
  if(isPointer(DST)) memory.setByte(toValue(SRC), DST.substr(1))
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
  let to = util.limit(0, memory.CAPACITY, toValue(DST.substr(1)))
  REGISTERS.P = to
}

export const JEQ = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA) 
  let bVal = toValue(SRCB) 
  if(aVal === bVal)
    REGISTERS.P = util.limit(0, memory.CAPACITY, toValue(DST.substr(1)))
}

export const JLT = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA) 
  let bVal = toValue(SRCB) 
  if(aVal < bVal)
    REGISTERS.P = util.limit(0, memory.CAPACITY, toValue(DST.substr(1)))
}

export const JGT = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA) 
  let bVal = toValue(SRCB) 
  if(aVal > bVal){
    REGISTERS.P = util.limit(0, memory.CAPACITY, toValue(DST.substr(1)))
  }
}

export const RANDW = (DST) => {
  MOV(util.rand(0xffff), DST)
}

export const RANDB = (DST) => {
  MOV(util.rand(0xff), DST)
}

export const NOP = () => { }

export const HALT = () => {
  HALTED = true
}

let ops = {
  NOP, MOV, ADD, SUB, MOD, SL, SR, AND, XOR, OR, JMP, 
  JEQ, JLT, JGT, HALT, LOG, RANDW, RANDB, 
}

// TODO: IN, OUT, PUSH, POP, CALL, RET, INTR, HALT
// TODO: RUNTIME (clock)
export const tick = () => {
  if(HALTED) return 
  let {P} = REGISTERS
  let instructionByte = memory.getWord(P)
  let next = ops[_INSTRUCTIONS[instructionByte]]
  let argc = next.length
  let args = []
  P += 2
  for(let i=0; i<argc; i++){
    let type = _TYPES[memory.getByte(P++)]
    let value
    if(type === 'REGISTER'){
      args.push(_REGISTERS[memory.getByte(P++)])
    } else if (type === 'POINTER'){
      args.push('x'+ util.toHexWord(memory.getWord(P)))
      P += 2
    } else if (type === 'CONSTANT'){
      args.push(util.toHexWord(memory.getWord(P)))
      P += 2
    }
  }
  let size = P - REGISTERS.P
  REGISTERS.P += size 
  next(...args)

  return {P, instructionByte, next, argc, args}
}
// TODO: IMPLMENT DEVICES (LCD, BUZZER, MEMORY_POKER)
