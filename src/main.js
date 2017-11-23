import './style/main.sass'



import * as cpu from './lib/cpu.js'
import * as dom from './lib/dom.js'
import * as util from './lib/util.js'
import * as clock from './lib/clock.js'
import * as audio from './lib/audio.js'
import * as memory from './lib/memory.js'
import * as assembler from './lib/assembler.js'

window.cpu = cpu
window.dom = dom
window.util = util
window.clock = clock
window.memory = memory
window.assembler = assembler 
window.audio = audio

import app from './component/app'

dom.find('root').append(app.ref)
