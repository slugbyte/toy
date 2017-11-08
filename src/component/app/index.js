
import * as cpu from '../../../engine/cpu.js'
import * as util from '../../../engine/util.js'
import * as memory from '../../../engine/memory.js'

window.cpu = cpu
window.util = util
window.memory = memory

class App extends React.Component {
  render(){
    return (
      <div className='app'>
        <h1> app </h1>
      </div>
    )
  }
}

export default App
