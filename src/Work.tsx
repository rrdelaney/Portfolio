import * as React from 'react'
import styled from 'styled-components'
import { Card } from './Card'
import { Title, Subtitle, Description, Point } from './Typo'

const Position = styled(Subtitle)`
  display: inline;
  font-size: 9pt;
  font-weight: bold;
`

const ConnectedCard = styled(Card)`
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 4px 2px;

  @media print {
    margin: 5px 0 0 0;
    width: calc(100% - 20px - 0.4rem);
    padding-left: calc(10px + 0.2rem);
    padding-right: 0;
    box-shadow: none;
    display: ${props => (props.hidePrint ? 'none' : 'block')};
  }

  &::before {
    content: '';
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
    padding: 0 0.4rem;
    margin: 0 0.85rem -0.4rem;
    background-color: teal;
    display: inline-block;
    border: 1px solid teal;
    border-radius: 100px;
    transition: max-width 1s, color 0.2s;
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

const PrintList = styled.ul`
  margin-top: 0;
  display: none;

  @media print {
    display: block;
  }
`

const PrintTime = styled(Position)`
  display: none;

  @media print {
    display: inline;
  }
`

export interface WorkProps {
  company: string
  position: string
  time: string
  data: string[]
  hidePrint?: boolean
}

export function Work({ company, position, time, data, hidePrint }: WorkProps) {
  return (
    <ConnectedCard center wide hidePrint={hidePrint}>
      <Title data-time={time}>
        {company}{' '}
        <Position>
          {position} <PrintTime>({time})</PrintTime>
        </Position>
      </Title>
      <Description>
        <PrintList>
          {data &&
            data.map((content, index) => (
              <Point key={index} dotted>
                {content}
              </Point>
            ))}
        </PrintList>
      </Description>
    </ConnectedCard>
  )
}
