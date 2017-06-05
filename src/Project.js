import React from 'react'
import glamorous from 'glamorous'
import Card, { CardImg } from './Card'
import { Title, Link, Description } from './Typo'

const ProjectText = glamorous.div({
  flex: '1',
  padding: '0 1rem'
})

export default function Project({ name, url, description, img, swapped }) {
  const text = (
    <ProjectText>
      <Title>
        <Link href={url}>{name}</Link>
      </Title>
      <Description>{description}</Description>
    </ProjectText>
  )
  const image = <CardImg side src={img} />

  return (
    <Card wide>
      {swapped ? image : text}
      {swapped ? text : image}
    </Card>
  )
}
