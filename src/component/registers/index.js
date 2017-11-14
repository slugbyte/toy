import './_registers.sass'
import * as cpu from '../../lib/cpu.js'

class Registers extends React.Component {
  shouldComponentUpdate(){
    return false
  }

  componentWillMount(){
    cpu.subscribe(this.forceUpdate.bind(this))
  }

  render(){
    return (
      <div className='registers'>
          <div className='register-names'>
            {cpu._REGISTERS.map((name) => 
              <div key={name}> {name} </div>)}
          </div>
          <div className='register-values'>
            {cpu._REGISTERS.map((name, key) => 
              <div key={name + key}> {cpu.REGISTERS[name]} </div>)}
          </div>
      </div>
    )
  }
}

export default Registers
