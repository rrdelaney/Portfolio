import React from 'react'
import dedent from 'dedent'
import Card from './Card'
import { Description } from './Typo'

const aboutContent = dedent`
  Developer currently @ Microsoft

  Insterested in frontend development, programming languages, and improving developer experience
`

export default function About() {
  return (
    <Card center transparent>
      <Description>
        {aboutContent}
      </Description>
    </Card>
  )
}
