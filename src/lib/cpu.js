// memory
// 0x0 programCounter
import * as util from './util.js'
import * as clock from './clock.js'
import * as memory from './memory.js'

// CONSTANTS
export const WORD_SIZE = 2

// USED FOR INDEXING WHEN PARSING AND EXECUTING
// Z - "ebp" pointer to bottom of stack
// S - "esp" pointer to top of stack
export const _REGISTERS = ['P', 'A', 'B', 'C', 'D', 'Z', 'S']
export const _TYPES = [
  'INSTRUCTION', 'CONSTANT', 'REGISTER', 'POINTER', 'PIN', 'VARIABLE',
  'DEREFERENCE',
]

export const _INSTRUCTIONS = [
  'NOP', 'MOV', 'ADD', 'SUB', 'MOD', 'SL', 'SR', 'AND', 'XOR', 'OR', 'JMP',
  'JEQ', 'JLT', 'JGT', 'INTR', 'HALT', 'LOG', 'RANDW', 'RANDB', 'IN', 'OUT',
  'CALL', 'RET',
]

// STATE
export const REGISTERS = {
  A: 0, B: 0, C: 0, D: 0, P: 0,
  Z: memory.CAPACITY, S: memory.CAPACITY
}
export const PINS = new Array(100).fill(0)
export const subscribers =  []
export const pinSubscribers = []
export let HALTED = (() => {
  let state = true
  return {
    setTrue: () => state = true,
    setFalse: () => state = false,
    toggle: () => state = !state,
    get: () => state
  }
})()

// HELPERS
// TODO: Constant and Pointer length should be option and upto 4 bytes
export const isRegister = (value) => new RegExp('^[A-DSZ]$').test(value)
export const isConstant = (value) => new RegExp('^[a-f0-9]{1,4}$').test(value)
export const isPointer = (value) => new RegExp('^x[a-f0-9]{1,4}$').test(value)
export const isPin = (value) => new RegExp('^#[a-f0-9]{1,4}$').test(value)
export const isLabel = (value) => new RegExp('^_[a-z_]+$').test(value)
export const isInstruction = (value) => _INSTRUCTIONS.includes(value)
export const isDereference = (value) => new RegExp('^\\*[A-DSZ]$').test(value)

export const cpuType = (SRC) => {
  if(isPin(SRC)) return 'PIN'
  if(isLabel(SRC)) return 'LABEL'
  if(isPointer(SRC)) return 'POINTER'
  if(isConstant(SRC)) return 'CONSTANT'
  if(isRegister(SRC)) return 'REGISTER'
  if(isInstruction(SRC)) return 'INSTRUCTION'
  if(isDereference(SRC)) return 'DEREFERENCE'
  if(SRC.trim() === '') return 'BLANK'
  throw new Error(`toValue error SRC (${SRC}) unsuported`)
}

export const toValue = (SRC) => {
  if(util.isNum(SRC)) return SRC
  if(isRegister(SRC)) return REGISTERS[SRC]
  // TODO: this doesn't assembly correctly for "MOV 99 x60"
  // When assembling it shouldn't read from memory.
  // it shows as toByteCode:
  // MOV 0001
  //  99 010099
  // x60 030000
  if(isPointer(SRC)) return memory.getByte(SRC.substr(1))
  if(isConstant(SRC)) return util.hexToNum(SRC)
  throw new Error('toValue error SRC unsuported')
}

export const setRegister = (num, reg) => {
  REGISTERS[reg] = util.limit(0, 0xffff, num)
  subscribers.forEach(cb => cb())
}

export const setProgramCounter = (num) => {
  REGISTERS.P = util.limit(0, memory.CAPACITY, num)
  if(clock._debug.get()){
    subscribers.forEach(cb => cb())
  }
}

export const setPin = (value, index) => {
  PINS[index] = value ? 1 : 0
  pinSubscribers.forEach(cb => cb())
}

export const setPinOn = () => {
  PINS[index] = 1
  pinSubscribers.forEach(cb => cb())
}

export const setPinOff = (index) => {
  PINS[index] = 0
  pinSubscribers.forEach(cb => cb())
}

export const togglePin = (index) => {
  PINS[index] = !!PINS[index] ? 0 : 1
  pinSubscribers.forEach(cb => cb())
}

export const incProgramCounter = (num=1) => {
  REGISTERS.P = util.limit(0, memory.CAPACITY, REGISTERS.P + num)
  if(clock._debug.get()){
    subscribers.forEach(cb => cb())
  }
}

export const subscribe = (cb) => {
  subscribers.push(cb)
}

export const pinSubscribe = (cb) => {
  pinSubscribers.push(cb)
}


// INSTRUCTIONS
export const MOV = (SRC, DST) => {
  if(isDereference(SRC)) {
    // chop "*" off "*A"
    SRC = SRC.substr(1);
    let val = memory.getByte(toValue(SRC))
    setRegister(val, DST)
  } else if(isRegister(DST)) setRegister(toValue(SRC), DST)
  else if(isPointer(DST)) memory.setByte(toValue(SRC), DST.substr(1))
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
  setProgramCounter(to)
}

export const JEQ = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA)
  let bVal = toValue(SRCB)
  if(aVal === bVal)
    setProgramCounter(util.limit(0, memory.CAPACITY, toValue(DST.substr(1))))
}

export const JLT = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA)
  let bVal = toValue(SRCB)
  if(aVal < bVal)
    setProgramCounter(util.limit(0, memory.CAPACITY, toValue(DST.substr(1))))
}

export const JGT = (SRCA, SRCB, DST) => {
  let aVal = toValue(SRCA)
  let bVal = toValue(SRCB)
  if(aVal > bVal){
    setProgramCounter(util.limit(0, memory.CAPACITY, toValue(DST.substr(1))))
  }
}

export const CALL = (DST) => {
  // push current program counter to stack
  let returnAddress = REGISTERS.P + 5
  REGISTERS.S -= 2;
  memory.setByte(returnAddress, REGISTERS.S);
  
  let to = util.limit(0, memory.CAPACITY, toValue(DST.substr(1)))
  setProgramCounter(to)
}

export const RET = () => { }

export const RANDW = (DST) => {
  MOV(util.rand(0xffff), DST)
}

export const RANDB = (DST) => {
  MOV(util.rand(0xff), DST)
}

export const NOP = () => { }

export const OUT = (SRC, DST) => {
  setPin(toValue(SRC), util.limit(0, PINS.length -1, toValue(DST)))
}

export const IN = (SRC, DST) => {
  let index = util.limit(0, PINS.length -1, toValue(SRC))
  let value = PINS[index]
  MOV(value, DST)
}

export const HALT = () => {
  HALTED.setTrue()
}

let ops = {
  NOP, MOV, ADD, SUB, MOD, SL, SR, AND, XOR, OR, JMP,
  JEQ, JLT, JGT, HALT, LOG, RANDW, RANDB, OUT,
  CALL, RET,
}

// TODO: IN, OUT, PUSH, POP, CALL, RET, INTR, HALT
// TODO: RUNTIME (clock)
export const tick = () => {
  let instructionByte = memory.getWord(REGISTERS.P)
  let next = ops[_INSTRUCTIONS[instructionByte]]
  let argc = next.length
  let args = []
  incProgramCounter(2)
  for(let i=0; i<argc; i++){
    let type = _TYPES[memory.getByte(REGISTERS.P)]
    let value
    incProgramCounter()
    if(type === 'REGISTER'){
      args.push(_REGISTERS[memory.getByte(REGISTERS.P)])
      incProgramCounter()
    } else if (type === 'POINTER'){
      args.push('x'+ util.toHexWord(memory.getWord(REGISTERS.P)))
      incProgramCounter(2)
    } else if (type === 'CONSTANT'){
      args.push(util.toHexWord(memory.getWord(REGISTERS.P)))
      incProgramCounter(2)
    }
  }

  next(...args)

  return {P: REGISTERS.P, instructionByte, next, argc, args}
}

export const reset = () => {
  _REGISTERS.forEach(name => {
    REGISTERS[name] = 0
  })
  
  // point the stack to the end of memory
  REGISTERS.Z = memory.CAPACITY
  REGISTERS.S = memory.CAPACITY
  
  PINS.fill(0)
  HALTED.setTrue()
  subscribers.forEach(cb => cb())
  pinSubscribers.forEach(cb => cb())
}

export const run = () => {
  reset()
  HALTED.setFalse()
}

clock.subscribe(() => {
  try {
    if(HALTED.get()) return
    tick()
  } catch(err) {
    util.error('__CPU_ERROR__', err)
  }
})
