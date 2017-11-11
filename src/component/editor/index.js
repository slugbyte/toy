import AceEditor from 'react-ace'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'

class Editor extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      text: '_main\n  ',
      error: '',
    }
  }

  handleChange = (text) => {
    this.setState({text})
  }

  assemble = () => {
    memory.clear()
    try {
      memory.load(assembler.assemble(this.state.text))
      this.setState({error: ''})
    } catch (err) {
      console.log(err)
      this.setState({error: err.message})
    }
  }

  render(){
    return (
      <div className='editor'>
        <header>
          <button onClick={this.assemble}> Assemble </button>
        </header>
        <AceEditor 
          onChange={this.handleChange}
          value={this.state.text}
          />
      </div>
    )
  }
}

export default Editor
