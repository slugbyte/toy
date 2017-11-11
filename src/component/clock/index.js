import * as clock from '../../lib/clock.js'

class Clock extends React.Component {
  render(){
    return (
      <div className='clock'>
        <p> CPS: {clock.cps.get()} </p>
      </div>
    )
  }
}

export default Clock
