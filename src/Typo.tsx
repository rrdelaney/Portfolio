import React from 'react'
import styled, { css } from 'styled-components'
import { emojify } from 'react-emojione'

interface CommonProps {
  hidePrint?: boolean
}

const common = ({ hidePrint }: CommonProps) =>
  css`
    @media print {
      font-family: 'Open Sans' !important;
      display: ${props => (hidePrint ? 'none' : null)};
    }
  `

const large = css`
  font-family: 'Roboto Mono';
  font-weight: 300;
`

const small = css`
  font-family: 'Cutive Mono';
  font-weight: 400;
`

export interface IconProps {
  dev?: string
  name: string
}

export const Icon = ({ dev, name }: IconProps) =>
  dev || name.startsWith('dev-') ? (
    <i className={`devicon-${name.replace('dev-', '')}`} />
  ) : (
    <i className="material-icons">{name}</i>
  )

export const Space = styled.span`
  width: 2rem;
  display: inline-block;
`

export const Break = styled.br`
  ${common} height: 3rem;
`

export const Hero = styled.h1`
  ${common} ${large}
  margin-top: 0;
  padding-top: 0.67em;
  font-size: 52pt;
  color: whitesmoke;
  width: 100%;
  text-align: center;

  @media print {
    padding-top: 0;
    color: #444444;
    margin: 0.2rem;
  }
`

export interface HeadingProps extends CommonProps {
  smallPrint?: boolean
}

export const Heading = styled.h1<HeadingProps>`
  ${common}
  ${large}
  color: whitesmoke;
  text-decoration: underline;
  width: 100%;
  text-align: center;

  @media print {
    color: #444444;
    text-align: left;
    padding-left: 10px;
    margin: 0.2rem;
    font-size: ${props => (props.smallPrint ? '12pt' : '16pt')};
    text-decoration: none;
    font-weight: 600;
  }
`

export const Title = styled.h3`
  ${common}
  ${large}
  @media print {
    margin-top: 0.1rem;
    margin-bottom: 0.3rem;
    font-size: 12pt;
  }
`

export const Subtitle = styled.h5`
  ${common} ${large};
`

export const BodyContainer = styled.p`
  ${common}
  ${small}
  
  @media print {
    font-size: 10pt;
  }
`

export interface BodyProps {
  hidePrint: boolean
  children: any
}

export const Body = ({ hidePrint, children }: BodyProps) => (
  <BodyContainer hidePrint={hidePrint}>
    {React.Children.map(children, c => emojify(`${c}`, { output: 'unicode' }))}
  </BodyContainer>
)

export interface LinkProps extends CommonProps {
  white?: boolean
  heading?: boolean
  href?: string
}

export const Link = styled.a<LinkProps>`
  ${common} ${small} font-family: 'Roboto Mono';

  color: ${props => (props.white ? 'whitesmoke' : 'cornflowerblue')};

  @media print {
    color: #444444;
    text-decoration: none;
  }

  &:hover {
    color: hotpink;
  }

  ${props =>
    props.heading &&
    css`
      padding: 0 1rem;
    `};
`

export const Description = styled(BodyContainer)`
  white-space: pre-line;

  @media print {
    font-size: 10pt;
    margin-top: 0.1rem;
  }
`

export interface PointProps extends CommonProps {
  dotted?: boolean
}

export const Point = styled.li<PointProps>`
  ${common} ${small} list-style: ${props => (props.dotted ? 'disc' : 'none')};
  padding-bottom: ${props => (props.dotted ? '.1rem' : '.5rem')};
  padding-left: ${props => (props.dotted ? '1rem' : '0')};
`

export const PrintLink = styled(Link)`
  display: none;
  font-size: 10pt;
  margin-left: 1rem;
  text-decoration: none;
  font-style: italic;

  @media print {
    display: initial;
  }
`
