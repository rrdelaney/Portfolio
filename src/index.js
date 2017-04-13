import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'
import './index.css'

if (window._glam) rehydrate(window._glam)

const { default: App } = require('./App')

const root = document.getElementById('root')
ReactDOM.render(<App />, root)

if (module.hot) {
  module.hot.accept('./App', () => {
    const { default: NextApp } = require('./App')
    ReactDOM.render(<NextApp />, root)
  })
}
