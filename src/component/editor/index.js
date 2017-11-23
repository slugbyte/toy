import './_editor.sass'
import * as dom from '../../lib/dom.js'

const editor = dom.component({
  type: 'div',
  content: 'editor',
  className: 'container editor',
})

export default editor
