// state
export let _fps = 100
export let _isOn = false
export const _subscribers = []

// interface
export const subscribe = (callback) => {
  _subscribers.push(callback)
}

export const tick = () => {
  if(!_isOn) return 
  setTimeout(() => {
    _subscribers.forEach(cb => cb())
    requestAnimationFrame(tick);
  }, 1000 / _fps)
}

export const start = () => {
  _isOn = true
  requestAnimationFrame(tick)
}

export const stop = () => {
  _isOn = false
}
