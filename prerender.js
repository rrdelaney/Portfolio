import { readFileSync, writeFileSync } from 'fs'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { minify } from 'html-minifier'
import App from './src/App'

const htmlFile = 'build/index.html'

console.log(chalk.green('==> Beginning prerendering...'))

console.log(chalk.magenta('==> Reading build/index.html'))
const originalHtml = readFileSync(htmlFile).toString()

console.log(chalk.magenta('==> Rendering site on the server'))
const sheet = new ServerStyleSheet()
const html = renderToString(sheet.collectStyles(<App />))
const reactHtml = `<div id="root">${html}</div>`
const reactCss = sheet.getStyleTags()

console.log(chalk.magenta('==> Generating new HTML'))
const newHtml = originalHtml
  .replace('<div id="root"></div>', reactHtml)
  .replace('<style id="SERVER_INJECT_STYLES"></style>', reactCss)

console.log(chalk.magenta('==> Minifying HTML'))
const minifiedHtml = minify(newHtml, {
  minifyCSS: true,
  minifyJS: true
})

console.log(chalk.yellow('==> Writing build/index.html'))
writeFileSync(htmlFile, minifiedHtml)

console.log(chalk.green('==> Site prerendered!'))
