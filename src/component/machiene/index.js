import './_machiene.sass'

import Chat from '../chat'
import Pins from '../pins'
import Clock from '../clock'
import Memory from '../memory'
import Registers from '../registers'
import DecimalToHex from '../decimal-to-hex'


class Machiene extends React.Component {
  shouldComponentUpdate(){ return false }
  render() {
    return (
      <div className='machiene'>
        <div className='toolbelt'>
          <Clock />
          <Chat />
        </div>
        <DecimalToHex />
        <Pins />
        <Registers />
        <Memory />
      </div>
    )
  }
}

export default Machiene
