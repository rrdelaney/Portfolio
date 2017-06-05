import React from 'react'
import Card from './Card'
import { Description } from './Typo'

export default function About({ children }) {
  return (
    <Card center transparent>
      <Description>
        {children}
      </Description>
    </Card>
  )
}
