import './_clock.sass'
import * as cpu from '../../lib/cpu.js'
import * as clock from '../../lib/clock.js'
import * as dom from '../../lib/dom.js'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'

class Clock extends React.PureComponent {
  componentWillMount(){
    clock.debugSubscribe(this.forceUpdate.bind(this))
  }

  render(){
    console.log('blam')
    return (
      <div className='clock'>
        <button onClick={cpu.run} className='run'> RUN </button>
        <button onClick={cpu.HALTED.toggle} className='pause'> PAUSE </button>  
        <button 
          onClick={clock._debug.toggle} 
          className={dom.classToggler({
            'debug': true,
            'debug-on': clock._debug.get(),
          })}> DEBUG </button>  
        <button onClick={cpu.tick} className='tick'> &gt; </button>
        <button onClick={cpu.reset} className='reset'> RESET  </button>
        <button onClick={memory.clear} className='clear'> CLEAR </button>
        <button onClick={assembler.build} className='assemble'> ASSEMBLE </button>
      </div>
    )
  }
}

export default Clock
