import * as util from './util.js'

export const renderIf = (test, component) => {
  if(test) return component
}

// nodes
export const classToggler = (options) => 
  Object.keys(options).filter(key => options[key]).join(' ')

export const find = (id) => document.getElementById(id)
export const query = (node) => (query) => node.querySelectorAll(query)
export const queryOne = (node) => (query) => node.querySelector(query)

export const append = (node) => (...nodes) => node.append(...nodes)
export const prepend = (node) => (...nodes) => node.prepend(...nodes)
export const remove = (node) => (...nodes) => node.remove(...nodes)
export const classAdd = (node) => (className) => node.classList.add(className)
export const classRemove = (node) => (className) => node.classList.remove(className)
export const classToggle = (node) => (className) => node.classList.toggle(className)
export const classGet = (node) => () => node.classList.value
export const onEvent = (name) => (node) => (cb) => node.addEventListener(name, cb)
export const attributeSet = (node) => (key, value) => node.setAttribute(key, value)
export const attributeRemove = (node) => (key) => node.removeAttribute(key)

export const appendChildren = (node) => (nodes) => node.append(...nodes)
export const prependChildren = (node) => (nodes) => node.prepend(...nodes)

export const el = (template) => {
  let tmp = document.createElement('div')
  tmp.innerHTML = template
  return tmp.firstElementChild
}

export const component = (options) => {
  let ref = document.createElement(options.type)
  ref.textContent = options.content
  ref.className = options.className

  if(options.attributes){
    Object.keys(options.attributes).forEach(key => ref.setAttribute(key, options.attributes[key]))
  }

  if(options.children){
    options.children.forEach(vNode => ref.append(vNode.ref))
  }
  return {
    ref,
    isComponent: true,
    append: append(ref),
    prepend: prepend(ref),
    remove: remove(ref),
    query: query(ref),
    queryOne: queryOne(ref),
    onClick: onEvent('click')(ref),
    onChange: onEvent('input')(ref),
    setContent: (content) => ref.textContent = content,
    attributes: {
      set: attributeSet(ref),
      remove: attributeRemove(ref),
    },
    class: {
      get: classGet(ref),
      add: classAdd(ref),
      remove: classRemove(ref),
      toggle: classToggle(ref),
    },
  }
}
