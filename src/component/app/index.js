
import * as cpu from '../../lib/cpu.js'
import * as util from '../../lib/util.js'
import * as memory from '../../lib/memory.js'

window.cpu = cpu
window.util = util
window.memory = memory

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidUpdate(){
    //util.log('__STATE__', this.state)
  }

  componentWillMount(){
    setInterval(() => {
      this.setState({
        A: cpu.REGISTERS.A,
        B: cpu.REGISTERS.B,
        C: cpu.REGISTERS.C,
        D: cpu.REGISTERS.D,
        raw: memory.memory.slice(0, 256).reduce((r, n, i) => {
          let hex = util.numToHex(n)
          r += util.hexNormalize(hex)
          r += ' '
          if(i === 255) return r
          if(i % 8 === 7)
            r += `\nx${util.hexNormalize(util.numToHex(i + 1))} -- `
          return r
        }, 'x00 -- '),
      })
    }, 250)
  }

  render(){
    let {A, B, C, D, raw} = this.state
    return (
      <div className='app'>
        <p> [A] dec: {A} hex:{util.numToHex(A)} </p>
        <p> [B] dec: {B} hex:{util.numToHex(B)} </p>
        <p> [C] dec: {C} hex:{util.numToHex(C)} </p>
        <p> [D] dec: {D} hex:{util.numToHex(D)} </p>
        <p> [MEM] </p>
        <pre>{raw}</pre>
      </div>
    )
  }
}

export default App
