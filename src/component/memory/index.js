import './_memory.sass'
import * as cpu from '../../lib/cpu.js'
import * as dom from '../../lib/dom.js'
import * as util from '../../lib/util.js'
import * as clock from '../../lib/clock.js'
import * as memory from '../../lib/memory.js'

let toHexMemory = util.map((value, index) => ({
  value: util.toHexByte(value),
  address: '0x' + util.toHexWord(index),
}))

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
          let className = dom.classToggler({
            'memory-item': true,
            'program-counter': index == cpu.REGISTERS.P && clock._debug.get(),
          })
          return (
            <div className={className} key={data.address}>
              <p className='address'> {data.address} </p>
              <p className='value'> {data.value} </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Memory

