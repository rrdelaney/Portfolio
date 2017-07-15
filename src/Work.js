import React from 'react'
import Card from './Card'
import { Title, Subtitle, Description, Point } from './Typo'

const Position = Subtitle.extend`
  display: inline;
  font-size: 9pt;
  font-weight: bold;
`

const ConnectedCard = Card.extend`
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: rgba(0, 0, 0, .2) 5px 5px 4px 2px;

  @media print {
    margin: 5px 10px 0 calc(10px + .2rem);
    box-shadow: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 36px;
    width: 2px;
    background-color: teal;
    height: 100%;

    @media print {
      display: none;
    }
  }

  ${Title}::before {
    display: inline;
    content: attr(data-time);
    color: teal;
    max-width: 0px;
    overflow: hidden;
    padding: 0 .4rem;
    margin: 0 .85rem -.4rem;
    background-color: teal;
    display: inline-block;
    border: 1px solid teal;
    border-radius: 100px;
    transition: max-width 1s, color .2s;
    text-overflow: clip;
    white-space: nowrap;

    @media print {
      display: none;
    }
  }

  &:hover ${Title}::before {
    max-width: 100vw;
    color: white;
  }
`

const PrintDescription = Description.extend`
  display: none;

  @media print {
    display: block;
  }
`

const PrintTime = Position.extend`
  display: none;

  @media print {
    display: inline;
  }
`

export default function Work({ company, position, time, data }) {
  return (
    <ConnectedCard center wide>
      <Title data-time={time}>
        {company} -
        {' '}<Position>{position} <PrintTime>({time})</PrintTime></Position>
      </Title>
      <PrintDescription>
        {data &&
          data.map((content, index) =>
            <Point key={index} dotted>{content}</Point>
          )}
      </PrintDescription>
    </ConnectedCard>
  )
}
