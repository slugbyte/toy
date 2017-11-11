// state
export let _isOn = false
export const _subscribers = []

// interface
export const subscribe = (callback) => {
  _subscribers.push(callback)
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
  setTimeout(() => {
    _subscribers.forEach(cb => cb())
    requestAnimationFrame(tick);
  }, 1000 / cps.get())
}

export const start = () => {
  _isOn = true
  requestAnimationFrame(tick)
}

export const stop = () => {
  _isOn = false
}
