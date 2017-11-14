// state
export let _isOn = false
export const _subscribers = []
export const _debugSubscribers = []
export let _debug = (() => {
  let state = false 
  let set = (value) => {
    state = value
    _debugSubscribers.forEach(cb => cb())
  }
  return {
    get: () => state,
    setTrue: () => set(true),
    setFalse: () => set(false),
    toggle: () => set(!state),
  }
})()

// interface
export const subscribe = (callback) => {
  _subscribers.push(callback)
}

export const debugSubscribe = (callback) => {
  _debugSubscribers.push(callback)
}

export const cps = ((() => {
  let _cps = 100
  return  {
    set: (num) => _cps = num,
    get: () => _cps,
  }
})())

export const tick = () => {
  if(!_isOn) return 
  if(!_debug.get()){
    setImmediate(() => {
      _subscribers.forEach(cb => cb())
      tick()
    })
  } else {
    setTimeout(() => {
      _subscribers.forEach(cb => cb())
      tick()
    }, 250)
  }
}

export const start = () => {
  _isOn = true
  requestAnimationFrame(tick)
}

export const stop = () => {
  _isOn = false
}

start()
