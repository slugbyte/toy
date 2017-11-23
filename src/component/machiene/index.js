import './_machiene.sass'
import * as dom from '../../lib/dom.js'

import controller from '../controller'

const machiene = dom.component({
  type: 'div',
  content: 'machiene',
  className: 'container machiene',
  children: [
    controller,
  ],
})

export default machiene
