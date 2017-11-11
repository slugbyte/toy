import Clock from '../clock'
import Memory from '../memory'
import Registers from '../registers'

class Machiene extends React.Component {
  render() {
    return (
      <div className='machiene'>
        <Clock />
        <Registers />
        <Memory />
      </div>
    )
  }
}

export default Machiene
