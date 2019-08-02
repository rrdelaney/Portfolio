import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const { App } = require('./App')

const root = document.getElementById('root')
ReactDOM.render(<App />, root)

declare var module: {
  hot?: {
    accept: (m: string, cb: () => void) => void
  }
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const { App } = require('./App')
    ReactDOM.render(<App />, root)
  })
}
