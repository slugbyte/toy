import './_memory.sass'
import * as cpu from '../../lib/cpu.js'
import * as dom from '../../lib/dom.js'
import * as util from '../../lib/util.js'
import * as clock from '../../lib/clock.js'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'

let toHexMemory = util.map((value, index) => ({
  value: util.toHexByte(value),
  address: '0x' + util.toHexWord(index),
}))

let getDebugData = (index) => {
  if(index > assembler._program.size) return ''
  if (!assembler._program.debug) return ''
  return  assembler._program.debug.reverse().reduce((r, d) => {
    let wat = d.offset + d.size 
    if(index < wat && index >= d.offset) {
      let result = d.type
      return {
        type: result.toLowerCase(),
        value: (d.value ? d.value : d.name),
      }
    }
    return r
  }, '')
}

class Memory extends React.Component {
  shouldComponentUpdate(){
    return false
  }

  componentWillMount(){
    memory.subscribe(this.forceUpdate.bind(this))

   cpu.subscribe(() => {
      if(clock._debug.get())
        this.forceUpdate()
    })
  }

  render(){
    let hexMemory = toHexMemory(memory.memory.slice())
    let {P} = cpu.REGISTERS
    return (
      <div className='memory'>
        {hexMemory.map((data , index) => {
          let debug = getDebugData(index)
          let className = dom.classToggler({
            'memory-item': true,
            'program-counter': index == cpu.REGISTERS.P && clock._debug.get(),
            [debug.type]:true,
          })
          return (
            <div className={className} key={data.address}>
              <div className='debug'> 
                <p> {data.address}  </p>
                <p> {debug.type} </p>
                <p>  {debug.value} </p>
              </div>
              <p className='value'> {data.value} </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Memory

