// state
export let _isOn = false
export const _subscribers = []

// interface
export const subscribe = (callback) => {
  _subscribers.push(callback)
}

export const fps = ((() => {
  let _fps = 100
  return  {
    set: (num) => _fps = num,
    get: () => _fps,
  }
})())

export const tick = () => {
  if(!_isOn) return 
  setTimeout(() => {
    _subscribers.forEach(cb => cb())
    requestAnimationFrame(tick);
  }, 1000 / fps.get())
}

export const start = () => {
  _isOn = true
  requestAnimationFrame(tick)
}

export const stop = () => {
  _isOn = false
}
