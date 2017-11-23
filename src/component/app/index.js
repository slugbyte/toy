import './_app.sass'
import * as dom from '../../lib/dom.js'
import * as util from '../../lib/util.js'

import editor from '../editor'
import machiene from '../machiene'

const app = dom.component({
  type: 'div',
  className: 'app',
  children: [
    machiene,
    editor,
  ],
})

window.app = app
export default app
