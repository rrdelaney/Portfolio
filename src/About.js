import React from 'react'
import Card from './Card'
import { Body } from './Typo'

const aboutContent = `
  I am RYAN O_O
`

export default function About () {
  return (
    <Card center>
      <Body>{aboutContent}</Body>
    </Card>
  )
}
