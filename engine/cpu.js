// memory 
// 0x0 programCounter

import * as util from './util.js'
import * as memory from './memory.js'

export const HALTED = false
export const PC = 0x00
export const REGISTERS = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
}

let COMMANDS = [
  'NOP',
  'MOV',
  'ADD',
  'SUB',
  'JMP',
  'JLT',
  'JGT',
  'JEQ',
  'HALT',
]

// REG ABCD
// MEM xfa5
// CON fa
export const isRegister = (value) => /[A-D]/.test(value)
export const isPointer= (value) =>  /x[a-f0-9][a-f0-9][a-f0-9]/.test(value)
export const isConstant = (value) =>  /[a-f0-9][a-f0-9]/.test(value)

export const toValue = (SRC) => {
  if(isRegister(SRC)) return REGISTERS[SRC]
  if(isPointer(SRC)) return memory.get(SRC.substr(1))
  if(isConstant(SRC)) return util.hexToNum(SRC)
  throw new Error('toValue error SRC unsuported')
}

export const store = (SRC, DEST) => {
  if(isRegister(DST)) REGISTERS[DST] = toValue(SRC)
  if(isPointer(DST)) memory.set(DST.substr(1), toValue(SRC))
}

export const exec = (CMD, SRC, DST, CND) => {
  switch (CMD){
    case 'NOP':
      PC++
      return 
    case 'MOV':
      // MOV SRC DST
      
    case 'ADD':
      // ADD SRC DST
    case 'SUB':
      // SUB SRC DST
    case 'JMP':
      // JMP DST
    case 'JLT':
      // JMP DST
    case 'JGT':
      // JMP SRC DST CND
    case 'JEQ':
      // JMP SRC DST CND
    case 'HLT':
      HALTED = true
    case 'INR':
      // INR ID DEST
  }
}

export const 


//
// reg A B C D 
// constant 234
// memory xff (value of memory)

//add A 1f
//add A b 
//add A xf

//mov A xf
//mov A 3
//mov x7 3

// jmp ff
// jle A B C
// jgt
// jeq

