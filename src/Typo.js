import React from 'react'
import { emojify } from 'react-emojione'

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

export const Hero = ({ children, styles = {} }) =>
  <h1 style={{ ...heroStyles, ...styles }}>{children}</h1>

const headingStyles = {
  ...common,
  ...large,
  color: 'white',
  textDecoration: 'underline'
}

export const Heading = ({ children, styles = {} }) =>
  <h1 style={{ ...headingStyles, ...styles }}>{children}</h1>

const titleStyles = {
  ...common,
  ...large
}

export const Title = ({ children, styles = {} }) =>
  <h3 style={{ ...titleStyles, ...styles}}>{children}</h3>

const bodyStyles = {
  ...common,
  ...small
}

export const Body = ({ children, styles = {} }) =>
  <p style={{ ...bodyStyles, ...styles }}>
    {React.Children.map(children, c => emojify(`${c}`, { output: 'unicode' }))}
  </p>
