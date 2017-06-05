import React from 'react'
import glamorous from 'glamorous'
import { emojify } from 'react-emojione'

const common = {}

const large = {
  fontFamily: 'Roboto Mono',
  fontWeight: 300
}

const small = {
  fontFamily: 'Roboto',
  fontWeight: 300
}

const bodyStyles = {
  ...common,
  ...small
}

export const Icon = ({ name }) => <i className="material-icons">{name}</i>

export const Space = glamorous.span({
  width: '2rem',
  display: 'inline-block'
})

export const Hero = glamorous.h1(common, large, {
  fontSize: '52pt',
  color: 'whitesmoke',
  width: '100%',
  textAlign: 'center',
  '@media print': {
    color: '#444444'
  }
})

export const Heading = glamorous.h1(common, large, {
  color: 'whitesmoke',
  textDecoration: 'underline',
  width: '100%',
  textAlign: 'center',
  '@media print': {
    color: '#444444'
  }
})

export const Title = glamorous.h3(common, large)

export const Body = ({ children, style = {} }) =>
  <p style={{ ...bodyStyles, ...style }}>
    {React.Children.map(children, c => emojify(`${c}`, { output: 'unicode' }))}
  </p>

export const Code = glamorous.code(common, small, {
  fontFamily: 'Operator Mono'
})

export const Link = glamorous.a(common, small, props => ({
  fontFamily: 'Roboto Mono',
  color: props.white ? 'whitesmoke' : 'cornflowerblue',
  padding: props.heading ? '0 1rem' : null
}))
