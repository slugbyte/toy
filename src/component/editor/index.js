import AceEditor from 'react-ace'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'

let program = `
_main
	MOV fff B
    JMP _loop

_loop
  JGT A B _done
  ADD 1 A
  JMP _loop
	
_done
  HALT 
`


class Editor extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      text: program.trim(),
      error: '',
    }
  }

  handleChange = (text) => {
    this.setState({text})
  }

  clear = () => {
    this.setState({
      text: '',
      error: '',
    })
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
          <button onClick={this.clear}> Clear </button>
        </header>
        <AceEditor 
          onChange={this.handleChange}
          value={this.state.text}
          width='100%'
          />
      </div>
    )
  }
}

export default Editor
