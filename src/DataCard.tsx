import * as React from 'react'
import styled from 'styled-components'
import { Card } from './Card'
import { Description, Point } from './Typo'

const SectionHead = styled.b`
  text-decoration: underline;

  @media print {
    text-decoration: none;
  }
`

export interface DataCardProps {
  slashed?: boolean
  data: string[] | Record<string, string | string[]>
}

export function DataCard({ slashed, data }: DataCardProps) {
  if (Array.isArray(data)) {
    return (
      <Card center transparent>
        <Description>
          {slashed
            ? data.join(' / ')
            : data.map((content, index) => (
                <Point key={index}>{content}</Point>
              ))}
        </Description>
      </Card>
    )
  }

  return (
    <Card center transparent>
      <Description>
        {Object.entries(data).map(
          ([key, value]: [string, string | string[]]) => (
            <div key={key} style={{ paddingBottom: '.3rem' }}>
              <SectionHead>{key}</SectionHead>:{' '}
              {Array.isArray(value) ? value.join(' / ') : value}
            </div>
          )
        )}
      </Description>
    </Card>
  )
}
