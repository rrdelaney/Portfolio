import React from 'react'
import Card, { CardImg } from './Card'
import { Title, Body, Link } from './Typo'

export default function Project ({ name, url, description, img }) {
  return (
    <Card noBottom>
      <Title>
        <Link href={url}>{name}</Link>
      </Title>
      <Body>{description}</Body>
      <CardImg src={img} />
    </Card>
  )
}
