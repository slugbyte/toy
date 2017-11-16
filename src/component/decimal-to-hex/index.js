import './_decimal-to-hex.sass'
import * as util from  '../../lib/util.js'

class DecimalToHex extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      decimal: 255,
      hex: 'ff',
    }
  }

  handleChange = (e) => {
    let {name, value} = e.target
    let decimal, hex

    if (name == 'hex') {
      value = value.replace(new RegExp('[^0-9a-fA-F]', 'g'), '') 
      this.setState({
        hex: value,
        decimal: util.hexToNum(value || 0),
      })
    } else {
      value = value.replace(new RegExp('[^0-9]', 'g'), '') 
      this.setState({
        hex: util.numToHex(value || 0),
        decimal: value,
      })
    }
  }

  render(){
    return (
      <div className='decimal-to-hex'>
        <label> hex </label>
        <input
          name='hex'
          value={this.state.hex}
          onChange={this.handleChange}
          />
        <label> decimal </label>
        <input
          name='decimal'
          value={this.state.decimal}
          onChange={this.handleChange}
          />
      </div>
    )
  }
}

export default DecimalToHex
