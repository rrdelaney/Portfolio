import React from 'react'

const common = {}

const large = {
  fontFamily: 'Roboto Mono',
  fontWeight: 300
}

const small = {
  fontFamily: 'Roboto',
  fontWeight: 400
}

const headingStyles = {
  ...common,
  ...large
}

export const Heading = ({ children }) =>
  <h1 style={headingStyles}>{children}</h1>

const titleStyles = {
  ...common,
  ...large
}

export const Title = ({ children }) =>
  <h3 style={titleStyles}>{children}</h3>

const bodyStyles = {
  ...common,
  ...small
}

export const Body = ({ children }) =>
  <p>{children}</p>
