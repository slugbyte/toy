// ATTEMPT 1
// if PIN 100 is on 
// each clock cycle play the note described by the first 8 bits

import * as clock from './clock.js'
import * as audio from './audio.js'
import * as cpu from './cpu.js'
import * as util from './util.js'


let midiToFreq = (note) => {
  let a = 440 
  return (a / 32) * Math.pow(2, (note - 9) / 12)
}

let osc = audio.Osc({frequency: 220})
let gain = audio.Gain({gain: 0})
audio.patch(osc, gain, audio.output)

clock.subscribe(() => {
  if(cpu.PINS[0]){
    let midiNote = cpu.PINS.slice(1, 9).map(v => v ? 1 : 0).join('')
    midiNote = util.binaryToNum(midiNote)
    let freq = midiToFreq(midiNote)
    osc.frequency.setValueAtTime(freq, audio.now())
    gain.gain.linearRampToValueAtTime(0.5, audio.now())
  } else {
    gain.gain.linearRampToValueAtTime(0, audio.now())
  }

})
