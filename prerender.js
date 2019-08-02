const { readFileSync, writeFileSync } = require('fs')
const chalk = require('chalk')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { ServerStyleSheet } = require('styled-components')
const { minify } = require('html-minifier')
const { App } = require('./build_node/App')

const htmlFile = 'build/index.html'

if (process.env.NODE_ENV !== 'production') {
  console.log(chalk.red('NODE_ENV must be set to production!'))
  process.exit(1)
}

console.log(chalk.green('==> Beginning prerendering...'))

console.log(chalk.magenta('==> Reading build/index.html'))
const originalHtml = readFileSync(htmlFile).toString()

console.log(chalk.magenta('==> Rendering site on the server'))
const sheet = new ServerStyleSheet()
const html = renderToString(sheet.collectStyles(React.createElement(App)))
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
