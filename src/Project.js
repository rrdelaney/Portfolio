import React from 'react'
import Card, { CardImg } from './Card'
import { Title, Link } from './Typo'

export default function Project ({ name, url, description, img, swapped }) {
  const title = (
    <Title>
      <Link href={url}>{name}</Link>
    </Title>
  )

  const image = <CardImg side src={img} />

  return (
    <Card wide>
      {swapped ? image : title}
      {swapped ? title : image}
    </Card>
  )
}
