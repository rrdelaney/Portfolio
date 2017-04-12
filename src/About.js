import React from 'react'
import Card from './Card'
import { Body } from './Typo'

const aboutContent = `
  I am RYAN O_O
`

const aboutStyles = {
  margin: '0 auto'
}

export default function About () {
  return (
    <Card style={aboutStyles}>
      <Body>{aboutContent}</Body>
    </Card>
  )
}
