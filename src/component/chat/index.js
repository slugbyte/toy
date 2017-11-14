import './_chat.sass'
import * as util from '../../lib/util.js'
import * as assembler from '../../lib/assembler.js'
import * as cpu from '../../lib/cpu.js'

let emptyState = {
  message: '',
  error: '',
  history: ['MOV ff A', 'ADD 1 B'],
  historyOffset: 0,
}
class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = emptyState
  }

  handleChange = (e) => {
    let {value} = e.target
    this.setState({message: value})
  }

  handleKeyDown = (e) => {
    switch(e.key){
      case 'ArrowUp':
        return this.setState(prev => ({
          historyOffset: util.limit(0 , prev.history.length -1, prev.historyOffset + 1),
          message: prev.history[prev.historyOffset] || '',
        }))
      case 'ArrowDown':
        return this.setState(prev => ({
          historyOffset: util.limit(0, prev.history.length -1, prev.historyOffset - 1),
          message: prev.history[prev.historyOffset - 1 ] || '',
        }))
    }
  }

  componentDidUpdate(){
    console.log('__CHAT_STATE__', this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('blam')
    try {
      let tokens = assembler.tokenizer(this.state.message)
      let cmd = tokens.map(t => t.value)
      cpu[cmd[0]](...cmd.slice(1))

      this.setState(prev => ({
        error: '',
        message: '',
        history: [this.state.message, ...prev.history].filter((v, i, a) => v !== a[i-1]),
        historyOffset: 0,
      }))
    } catch (err) {
      this.setState({error: err.message})
      console.error(err)
    }
    
  }

  render(){
    return (
      <form 
        onSubmit={this.handleSubmit}
        className='chat'>
        <input
          placeholder='$ '
          value={this.state.message}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          />
      {this.state.error ? <p className='error'> {this.state.error} </p> : undefined }
      </form>
    )
  }
}

export default Chat
