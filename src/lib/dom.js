export const renderIf = (test, component) => {
  if(test) return component
}

// nodes
export const classToggler = (options) => 
  Object.keys(options).filter(key => options[key]).join(' ')
export const find = (id) => document.getElementById(id)
export const query = (query) => (node) => node.querySelectorAll(query)
export const queryOne = (query) => (node) => node.querySelector(query)
export const append = (...nodes) => (node) => node.append(...nodes)
export const prepend = (...nodes) => (node) => node.prepend(...nodes)
export const appendChildren = (nodes) => (node) => node.append(...nodes)
export const prependChildren = (nodes) => (node) => node.prepend(...nodes)
export const remove = (...nodes) => (node) => node.remove(...nodes)
export const el = (template) => {
  let tmp = document.createElement('div')
  tmp.innerHTML = template
  return tmp.firstElementChild
}
