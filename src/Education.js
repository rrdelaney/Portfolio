import React from 'react'
import Card from './Card'
import { Description, Point } from './Typo'

export default function Education({ data }) {
  return (
    <Card center transparent>
      <Description>
        {data.map((content, index) => <Point key={index}>{content}</Point>)}
      </Description>
    </Card>
  )
}
