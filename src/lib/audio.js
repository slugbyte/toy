// audio context
export const ctx = new (window.AudioContext || window.webkitAudioContext)()

// audio out
export const output = ctx.destination
export const now = () => ctx.currentTime

// WAVE SHAPES
export const SINE = 'sine'
export const SQUARE = 'square'
export const TRIANGLE = 'triangle'
export const SAWTOOTH = 'sawtooth'
export const shapes = {SINE, SQUARE, TRIANGLE, SAWTOOTH}

// MODULATION TYPES
export const SET = 'set'
export const LINEAR = 'linear'
export const EXPONENTIAL = 'exponential'
export const curves = {SET, LINEAR, EXPONENTIAL}

// FILTER TYPES
export const NOTCH = 'notch'
export const PEAKING = 'peaking'
export const ALLPASS = 'allpass'
export const LOWPASS = 'lowpass'
export const BANDPASS = 'bandpass'
export const HIGHPASS = 'highpass'
export const LOWSHELF = 'lowshelf'
export const HIGHSHELF = 'highshelf'
export const filters = {NOTCH, PEAKING, ALLPASS, LOWPASS, BANDPASS, HIGHPASS, LOWSHELF, HIGHSHELF}


export const Modulation = ({type=SET, time=0, value=0}) => ({type, time, value})

export const AD = ({gain=1, attackTime=0.5, decayTime=0.5, attackType=LINEAR, decayType=LINEAR}) => {
  return [
    Modulation({type: SET, value: 0.01}),
    Modulation({type: attackType, value: gain, time: attackTime}),
    Modulation({type: decayType, value: 0.01, time: decayTime}),
  ]
}

export const ADSR = ({
  gain=1, 
  attackTime=0.5, 
  attackType=LINEAR, 
  decayTime=0.5, 
  decayType=LINEAR,
  sustainTime=0.5, 
  sustainLevel=0.5,
  releaseTime=0.5, 
  releaseType=LINEAR,
}) => {
  return [
    Modulation({type: SET, value: 0.01, time: 0}),
    Modulation({type: attackType, value: gain, time: attackTime}),
    Modulation({type: decayType, value: gain * sustainLevel, time: decayTime}),
    Modulation({type: SET, value: gain * sustainLevel, time: sustainTime}),
    Modulation({type: releaseType, value: 0.01, time: releaseTime}),
  ]
}

export const applyEnvelope = ({subject, steps}) => {
  let ellapsed = ctx.currentTime
  steps.forEach(mod => {
    ellapsed += mod.time
    switch(mod.type){
      case SET:
        subject.setValueAtTime(mod.value, ellapsed)
        break;
      case LINEAR:
        subject.linearRampToValueAtTime(mod.value, ellapsed)
        break;
      case EXPONENTIAL:
        subject.exponentialRampToValueAtTime(mod.value, ellapsed)
        break;
    }
  })
}

export const applyParam = ({subject, value}) => {
  let now = ctx.currentTime
  if(typeof value === 'number')
    subject.setValueAtTime(value, now)
  else if(Array.isArray(value))
    applyEnvelope({subject, steps: value})
  else if(value.connect)
    value.connect(subject)
  else 
    throw new TypeError('value param type is not supported')
}


export const Osc = ({start=0, stop=null, frequency=220, type=SINE, detune=0}) => {
  let now = ctx.currentTime
  let result = ctx.createOscillator()
  result.type = type   
  applyParam({subject: result.frequency, value: frequency})
  if(start !== null)
    result.start(start)
  if(stop!== null)
    result.stop(now + stop)
  return result
}

export const Gain = ({gain=1}) => {
  let result = ctx.createGain()
  applyParam({subject: result.gain, value: gain})
  return result
}

export const Delay = ({delayTime=0}) => {
  let result = ctx.createDelay()
  applyParam({subject: result.delayTime, value: delayTime})
  return result
}

export const Filter = ({Q=1, gain=0, detune=0, frequency=350, type=LOWPASS}) => {
  let result = ctx.createBiquadFilter()
  result.type = type
  applyParam({subject: result.Q, value: Q})
  applyParam({subject: result.gain, value: gain})
  applyParam({subject: result.detune, value: detune})
  applyParam({subject: result.frequency, value: frequency})
  return result
}

export const connect = (nodes) => {
  for(let i=0; i<nodes.length-1; i++)
    nodes[i].connect(nodes[i+1])
  return nodes
}

export const patch = (...args) => {
  return connect(args)
}
