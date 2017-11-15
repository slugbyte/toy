// parse line into

import * as cpu from './cpu.js'
import * as util from './util.js'
import * as memory from './memory.js'

// state
export let _program = {}
export let _error = ''
export let _text = `_main
    OUT 1 0
    CALL _on
    JMP _loop
    
_loop
    JGT A 64 _flip
    OUT x80 A
    ADD 1 A
    PUSH 69
    JMP _loop
    
_flip
    MOV 0 A
    JGT x80 0 _calloff
    CALL _on
    JMP _loop
    
_calloff
    CALL _off
    JMP _loop
    
_on
    MOV 1 x80
    RET

_off
    MOV 0 x80
    RET`

class Bug extends Error {
  constructor({index, token, message}){
    super(`index:${index} token:${token.value} ${message}`)
  }
}

// string -> tokens
export const tokenizer = (program) => {
  return program.trim().split('\n').map(statement => {
    return statement.trim().split(' ').map(token => ({
      type: cpu.cpuType(token),
      value: token,
    }))
  })
  .reduce((result, statement) => result.concat(statement), [])
  .filter(token => token.type !== 'BLANK')
}

// tokens -> AST
export const parser = (tokens) => {
  let wasJUMP = false
  let isJUMP = (token) => {
    if (['JMP', 'JLT', 'JEQ', 'JGT', 'CALL'].includes(token.value)) {
      wasJUMP = true
      return wasJUMP
    } else {
      wasJUMP = false
      return wasJUMP
    }
  }

  let program = {
    type: 'PROGRAM',
    body: [],
  }
    
  tokens.forEach((token, i) => {
    let label = program.body[program.body.length -1]
    switch(token.type){
      case 'LABEL':
        if(wasJUMP){
          wasJUMP = false
          if(!label.body)
            throw new Bug({
              token,
              index: i,
              message: `ARGUMENT needs a INSTRUCTION`,
            })
          let instruction = label.body[label.body.length -1]
          if(!instruction ||!instruction.params)
            throw new Bug({
              token,
              index: i,
              message: `ARGUMENT needs a INSTRUCTION`,
            })
          instruction.params.push(token)
        } else {
          program.body.push({
            body: [],
            ...token,
          })
        }
        break;
      case 'INSTRUCTION':
        if(!label.body)
          throw new Bug({
            token,
            index: i,
            message: `INSTRUCTION bust be in a label`,
          })
        isJUMP(token)
        label.body.push({
          params: [],
          ...token,
        })
        break;
      //ARGUMENTS
      default:
        if(!label.body)
          throw new Bug({
            token,
            index: i,
            message: `ARGUMENT needs a INSTRUCTION`,
          })
        let instruction = label.body[label.body.length -1]
        if(!instruction ||!instruction.params)
          throw new Bug({
            token,
            index: i,
            message: `ARGUMENT needs a INSTRUCTION`,
          })
        instruction.params.push(token)
    }
  })
  return program
}

// BYTECODE DEF
// Instruction  WORD [VALUE]
// Register     BYTE BYTE [TYPE] [VALUE]
// Pointer      BYTE WORD [TYPE] [VALUE]
// Constant     BYTE WORD [TYPE] [VALUE]
// Pin          BYTE WORD [TYPE] [VALUE]

// AST -> bytecode
export const transform = (ast) => {
  // compile program
  //   compile label
  //     compile instruction
  //     compile argument
  //     compute label pointers
  let typeToByte = (type) => util.toHexByte(cpu._TYPES.indexOf(type))
  let toByteCode = (token, isDest) => {
    switch(token.type){
      case 'INSTRUCTION':
        return util.toHexWord(cpu._INSTRUCTIONS.indexOf(token.value))
      case 'REGISTER':
        return typeToByte(token.type) + util.toHexByte(cpu._REGISTERS.indexOf(token.value))
      case 'DEREFERENCE':
        return typeToByte(token.type) + util.toHexByte(cpu._REGISTERS.indexOf(token.value.substr(1)))
      case 'CONSTANT':
        return typeToByte(token.type) + util.toHexWord(cpu.toValue(token.value))
      case 'POINTER':
          return typeToByte(token.type) + util.toHexWord(token.value.slice(1))
        // return typeToByte(token.type) + util.toHexWord(cpu.toValue(token.value))
      case 'PIN':
        return typeToByte(token.type) + util.toHexWord(cpu.toValue(token.value))
      case 'LABEL':
        return `=${token.value}=`
    }
  }

  let lastSize = 0
  let labels = ast.body.map(label => {
    let instructions = label.body.map(instruction => {
      let params = instruction.params.map((param, i) => {
        // param bytecode and size
        let isDest = i == instruction.params.length - 1
        let bytecode = toByteCode(param, isDest)
        let size = param.type === 'LABEL' ? 3 : bytecode.length / 2
        return {param, bytecode, size}
      })

      // instruction bytecode and size
      let instructionWord = toByteCode(instruction)
      let bytecode = [instructionWord].concat(params.map(p => p.bytecode).join('')).join('')
      let size = params.reduce((r, p) => p.size + r, 2)
      return {instruction, instructionWord, params, bytecode, size}
    })

    // label bytecode and size
    let bytecode = instructions.map(c => c.bytecode).join('')
    let offset = lastSize
    let size = instructions.reduce((r, i) => r + i.size, 0)
    lastSize += size
    return {label, instructions, bytecode, size, offset}
  })

  // program bytecode and size
  let bytecode = labels.map(l => l.bytecode).join('')
  let size = labels.reduce((r, l) => r + l.size, 0)

  // replace lables with memory address
  let pointerType = typeToByte('POINTER')

  // replace labels with pointers
  bytecode = labels.reduce((r, label) => {
    let address = pointerType + util.toHexWord(label.offset)
    //console.log(label.label.value , label.offset, address)
    return r.replace(new RegExp(`=${label.label.value}=`, 'g'), address)
  }, bytecode)
  
  return {ast, labels, bytecode, size}
}

export const assemble = (program) => {
  return transform(parser(tokenizer(program)))
}


export const setProgram = (text) => {
  _text = text
}

export const build = () => {
  try {
    _program = assemble(_text)
    _error = ''
    cpu.reset()
    memory.clear()
    memory.load(_program.bytecode)
  } catch (err) {
    console.error('__BUILD_ERROR__', err)
    _error = err.message
  }
}

build()
