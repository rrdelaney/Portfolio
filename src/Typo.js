import React from 'react'
import { emojify } from 'react-emojione'

export const Icon = ({ name }) => <i className='material-icons'>{name}</i>

const common = {}

const large = {
  fontFamily: 'Roboto Mono',
  fontWeight: 300
}

const small = {
  fontFamily: 'Roboto',
  fontWeight: 400
}

const heroStyles = {
  ...common,
  ...large,
  fontSize: '52pt',
  color: 'white',
  width: '100%',
  textAlign: 'center'
}

export const Hero = ({ children, style = {} }) =>
  <h1 style={{ ...heroStyles, ...style }}>{children}</h1>

const headingStyles = {
  ...common,
  ...large,
  color: 'white',
  textDecoration: 'underline',
  width: '100%',
  textAlign: 'center'
}

export const Heading = ({ children, style = {} }) =>
  <h1 style={{ ...headingStyles, ...style }}>{children}</h1>

const titleStyles = {
  ...common,
  ...large
}

export const Title = ({ children, style = {} }) =>
  <h3 style={{ ...titleStyles, ...style }}>{children}</h3>

const bodyStyles = {
  ...common,
  ...small
}

export const Body = ({ children, style = {} }) =>
  <p style={{ ...bodyStyles, ...style }}>
    {React.Children.map(children, c => emojify(`${c}`, { output: 'unicode' }))}
  </p>

const codeStyles = {
  ...common,
  ...small,
  fontFamily: 'Operator Mono'
}

export const Code = ({ children, style = {} }) =>
  <code style={{ ...codeStyles, ...style }}>{children}</code>
