import ReactDom from 'react-dom'

import App from './component/app'

const container = document.createElement('div')
document.body.append(container)
ReactDom.render(<App />, container)
