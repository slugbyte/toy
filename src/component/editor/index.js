import AceEditor from 'react-ace'
import * as cpu from '../../lib/cpu.js'
import * as memory from '../../lib/memory.js'
import * as assembler from '../../lib/assembler.js'

class Editor extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      text: assembler._text || '',
      error: '',
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.text === nextState.text) return false
    return true
  }

  handleChange = (text) => {
    this.setState({text})
    assembler.setProgram(text)
  }

  clear = () => {
    this.setState({
      text: '',
      error: '',
    })
  }

  render(){
    return (
      <div className='editor ace-chaos'>
        <AceEditor 
        theme="github"
          mode='java'
          onChange={this.handleChange}
          value={this.state.text}
          width='100%'
          height='100%'
          />
      </div>
    )
  }
}

export default Editor
