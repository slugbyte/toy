import './_app.sass'
import * as clock from '../../lib/clock.js'
import Editor from '../editor'
import Terminal from '../terminal'
import Machiene from '../machiene'

class App extends React.Component {
  // re-render the app on each clock cycle
  shouldComponentUpdate() {return false}
  render(){
    return (
      <div className='app'>
        <Editor />
        <Machiene />
      </div>
    )
  }
}

export default App
