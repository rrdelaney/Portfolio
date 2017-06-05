import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const { default: App } = require('./App')

const root = document.getElementById('root')
ReactDOM.render(<App />, root)

if (module.hot) {
  module.hot.accept('./App', () => {
    const { default: NextApp } = require('./App')
    ReactDOM.render(<NextApp />, root)
  })
}
