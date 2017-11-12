import './_clock.sass'
import * as clock from '../../lib/clock.js'

class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOn: clock._isOn,
      cps: clock.cps.get(),
    }
  }

  handleSwitch = (e) => {
    let {checked} = e.target
    this.setState({isOn: checked})

    console.log('checked', checked)

    if(checked)
      clock.start()
    else 
      clock.stop()
  }

  handleCPSChange = (e) => {
    let {value} = e.target
    this.setState({cps: value})
    clock.cps.set(value)
  }

  render(){
    return (
      <div className='clock'>
        <input 
          className='cps'
          type='number'
          value={this.state.cps}
          onChange={this.handleCPSChange}
          />

        <div className='switch'>
          <input  
            id='clock-switch'
            type='checkbox'
            value={this.state.isOn}
            onChange={this.handleSwitch}
            />
          <label htmlFor='clock-switch'><div></div></label>
        </div>
      </div>
    )
  }
}

export default Clock
