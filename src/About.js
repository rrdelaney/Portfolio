import React from 'react'
import Card from './Card'
import { Body } from './Typo'

const aboutContent = `
  I am RYAN O_O
`

export default function About () {
  return (
    <Card center transparent>
      <Body style={{ fontFamily: 'Roboto Mono' }}>{aboutContent}</Body>
    </Card>
  )
}
