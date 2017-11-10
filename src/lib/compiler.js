// parse line into 

import * as cpu from './cpu.js'

class Bug extends Error {
  constructor({index, token, message}){
    super(`index:${index} token:${token.value} ${message}`)
  }
}

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


export const parser = (tokens) => {
  let wasJUMP = false
  let isJUMP = (token) => {
    if (['JMP', 'JLT', 'JEQ', 'JGT'].includes(token.value)) {
      console.log('jump')
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
            ...token,
            body: [],
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
          ...token,
          params: [],
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



export const compile = (program) => {
  return parser(tokenizer(program))
}
