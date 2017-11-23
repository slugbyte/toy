import './_controller.sass'
import * as dom from '../../lib/dom.js'

// run pause debug step reset format assemble

let run = dom.component({
  type: 'button',
  className: 'container run',
  content: 'RUN',
})

let pause = dom.component({
  type: 'button',
  content: 'PAUSE',
  className: 'container pause',
})

let debug = dom.component({
  type: 'button',
  content: 'DEBUG',
  className: 'container debug',
})

let step  = dom.component({
  type: 'button',
  content: '>',
  className: 'container step',
})

let reset = dom.component({
  type: 'button',
  content: 'RESET',
  className: 'container reset',
})

let format = dom.component({
  type: 'button',
  content: 'FORMAT',
  className: 'container format',
})

let assemble = dom.component({
  type: 'button',
  content: 'ASSEMBLE',
  className: 'container assemble',
})

// run pause debug step reset format assemble
let controller = dom.component({
  type: 'div',
  className: 'container controller',
  children: [
    run,
    pause,
    debug,
    step,
    reset,
    format,
    assemble,
  ],
})

export default controller
