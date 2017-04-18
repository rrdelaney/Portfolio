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
  fontWeight: 400
}

const bodyStyles = {
  ...common,
  ...small
}

export const Icon = ({ name }) => <i className='material-icons'>{name}</i>

export const Space = glamorous.span({
  width: '2rem',
  display: 'inline-block'
})

export const Hero = glamorous.h1(common, large, {
  fontSize: '52pt',
  color: 'white',
  width: '100%',
  textAlign: 'center'
})

export const Heading = glamorous.h1(common, large, {
  color: 'white',
  textDecoration: 'underline',
  width: '100%',
  textAlign: 'center'
})

export const Title = glamorous.h3(common, large)

export const Body = ({ children, style = {} }) =>
  <p style={{ ...bodyStyles, ...style }}>
    {React.Children.map(children, c => emojify(`${c}`, { output: 'unicode' }))}
  </p>

export const Code = glamorous.code(common, small, {
  fontFamily: 'Operator Mono'
})

export const Link = glamorous.a(common, small, {
  fontFamily: 'Roboto Mono',
  color: 'cornflowerblue'
})
