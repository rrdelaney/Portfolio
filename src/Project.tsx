import React from 'react'
import styled from 'styled-components'
import { Card, CardImg } from './Card'
import { Title, Link, Description, PrintLink } from './Typo'

const ProjectText = styled.div`
  flex: 1;
  padding: 0 1rem;

  @media print {
    padding: 0;
  }
`

export interface ProjectProps {
  name: string
  url: string
  description: string
  img: string
  swapped?: boolean
  hidePrint?: boolean
}

export function Project({
  name,
  url,
  description,
  img,
  swapped,
  hidePrint
}: ProjectProps) {
  const image = <CardImg side src={img} />
  const text = (
    <ProjectText>
      <Title>
        <Link href={url}>{name}</Link>
        <PrintLink href={url}>{url}</PrintLink>
      </Title>
      <Description>{description}</Description>
    </ProjectText>
  )

  return (
    <Card wide hidePrint={hidePrint}>
      {swapped ? image : text}
      {swapped ? text : image}
    </Card>
  )
}
