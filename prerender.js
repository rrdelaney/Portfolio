import { readFileSync, writeFileSync } from 'fs'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { renderStatic } from 'glamor/server'
import App from './src/App'

const htmlFile = 'build/index.html'

console.log(chalk.green('==> Beginning prerendering...'))

console.log(chalk.cyan('==> Reading build/index.html'))
const originalHtml = readFileSync(htmlFile).toString()

console.log(chalk.magenta('==> Rendering site on the server'))
const { html, css, ids } = renderStatic(() => renderToString(<App />))
const reactHtml = `<div id="root">${html}</div>`
const reactCss = `<style>${css}</style>`
const reactIds = `<script>window._glam = ${JSON.stringify(ids)}</script>`

console.log(chalk.blue('==> Generating new HTML'))
const newHtml = originalHtml
  .replace('<div id="root"></div>', reactHtml)
  .replace('<style id="SERVER_INJECT_STYLES"></style>', reactCss)
  .replace('<script id="SERVER_INJECT_ID"></script>', reactIds)

console.log(chalk.yellow('==> Writing build/index.html'))
writeFileSync(htmlFile, newHtml)

console.log(chalk.green('==> Site prerendered!'))
