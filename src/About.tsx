import * as React from 'react'
import { Card } from './Card'
import { Description } from './Typo'

interface AboutProps {
  children: any
}

export function About({ children }: AboutProps) {
  return (
    <Card center transparent hidePrint>
      <Description>{children}</Description>
    </Card>
  )
}
