import * as cpu from '../../lib/cpu.js'

class Registers extends React.Component {
  render(){
    return (
      <div className='register'>
        <table>
          <tbody>
            <tr>
              {cpu._REGISTERS.map((name) => 
                <th key={name}> {name} </th>)}
            </tr>
            <tr>
              {cpu._REGISTERS.map((name, key) => 
                <td key={name + key}> {cpu.REGISTERS[name]} </td>)}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Registers
