import React from 'react'
import Card from './Card'
import { Description } from './Typo'

export default function Education({ data }) {
  return (
    <Card center transparent>
      <Description>
        {data.map((content, index) => <li key={index}>{content}</li>)}
      </Description>
    </Card>
  )
}
