import * as cpu from '../../lib/cpu.js'
import * as util from '../../lib/util.js'
import * as clock from '../../lib/clock.js'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'
import * as dom from '../../lib/dom.js'

import Editor from '../editor'
import Terminal from '../terminal'
import Machiene from '../machiene'

class App extends React.Component {
  // re-render the app on each clock cycle
  componentWillMount(){
    clock.subscribe(() => this.forceUpdate())
    clock.start()
  }

  render(){
    return (
      <div className='app'>
        <Terminal />
        <Editor />
        <Machiene />
      </div>
    )
  }
}

export default App
