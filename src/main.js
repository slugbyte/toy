import './style/main.sass'

import * as cpu from './lib/cpu.js'
import * as memory from './lib/memory.js'
import * as util from './lib/util.js'
import * as compiler from './lib/compiler.js'
import * as dom from './lib/dom.js'

window.cpu = cpu
window.dom = dom
window.util = util
window.memory = memory
window.compiler = compiler
