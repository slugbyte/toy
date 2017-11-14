export const renderIf = (test, component) => {
  if(test) return component
}

export const classToggler = (options) => 
  Object.keys(options).filter(key => options[key]).join(' ')
