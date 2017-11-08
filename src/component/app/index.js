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
        PC: cpu.PC,
        raw: memory.memory.slice(0, 256).reduce((r, n, i) => {
          r += util.hexByte(n) + ' '
          if(i === 255) return r
          if(i % 8 === 7)
            r += `\nx${util.hexByte(i + 1)} -- `
          return r
        }, 'x00 -- '),
      })
    }, 250)
  }

  render(){
    let {A, B, C, D, PC, raw} = this.state
    return (
      <div className='app'>
        <p> [PC] dec: {PC} hex: x{util.pcToHex(PC)} </p>
        <p> [A] dec: {A} hex: x{util.hexByte(A)} </p>
        <p> [B] dec: {B} hex: x{util.hexByte(B)} </p>
        <p> [C] dec: {C} hex: x{util.hexByte(C)} </p>
        <p> [D] dec: {D} hex: x{util.hexByte(D)} </p>
        <p> [MEM] </p>
        <pre>{raw}</pre>
      </div>
    )
  }
}

export default App
