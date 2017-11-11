import './_memory.sass'
import * as cpu from '../../lib/cpu.js'
import * as dom from '../../lib/dom.js'
import * as util from '../../lib/util.js'
import * as memory from '../../lib/memory.js'

let toHexMemory = util.map((value, index) => ({
  value: util.toHexByte(value),
  address: '0x' + util.toHexWord(index),
}))

class Memory extends React.Component {
  render(){
    let hexMemory = toHexMemory(memory.memory)
    let {P} = cpu.REGISTERS
    return (
      <div className='memory'>
        <h1> memory </h1>
        {hexMemory.map((data , index) => 
          <div className='memory-item' key={data.address}>
            <p> {index === P ?  'P' : 'X'} </p>
            <p className='address'> {data.address} </p>
            <p className='value'> {data.value} </p>
          </div>
        )}
      </div>
    )
  }
}

export default Memory

