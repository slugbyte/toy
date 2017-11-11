export const element = (template) => {
  let temp = document.createElement('div')
  temp.innerHTML = template
  return temp.firstElementChild
}

export const onEvent = type => cb => query => 
  document.querySelector(query).addEventListener(type, cb)
