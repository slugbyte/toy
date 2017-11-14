import AceEditor from 'react-ace'
import * as cpu from '../../lib/cpu.js'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'

let program = `
_main
    MOV 63 B
    JMP _loop

_loop
    JGT A B _done
    ADD 1 A
    MOV A C
    MOD 2 C 
    JEQ 0 C _fizz
    JMP _buzz
    
_fizz
    MOV ff D
    JMP _loop

_buzz
    MOV bb D
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

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.text === nextState.text) return false
    return true
  }

  componentDidMount(){
    this.assemble()
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
    console.log('assemble')
    cpu.reset()
    memory.clear()
    try {
      memory.load(assembler.assemble(this.state.text || ''))
      this.setState({error: ''})
    } catch (err) {
      console.log(err)
      this.setState({error: err.message})
    }
  }

  render(){
    return (
      <div className='editor ace-chaos'>
        <header>
          <button onClick={this.assemble}> ASSEMBLE </button>
          <button onClick={this.clear}> CLEAR </button>
        </header>
        <AceEditor 
        theme="github"
          mode='java'
          onChange={this.handleChange}
          value={this.state.text}
          width='100%'
          />
      </div>
    )
  }
}

export default Editor
