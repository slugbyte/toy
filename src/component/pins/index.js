import './_pins.sass'
import * as cpu from '../../lib/cpu.js'
import * as dom from '../../lib/dom.js'

class Pins extends React.Component {
  shouldComponentUpdate(){return false}
  componentWillMount(){
    cpu.pinSubscribe(this.forceUpdate.bind(this))
  }

  render (){
    return (
      <div className='pins'>
        <div className='switches'>
          {cpu.PINS.map((pin, key) => 
            <div 
            key={key} 
            onClick={() => cpu.togglePin(key)}
            className={dom.classToggler({
              'switch': true,
              'switch-on': pin,
            })} />
          )}
        </div>
      </div>
    )
  }
}

export default Pins
