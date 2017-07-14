import React from 'react'
import styled, { css } from 'styled-components'
import { emojify } from 'react-emojione'

const common = ({ hidePrint }) =>
  css`@media print {
    font-family: 'Open Sans' !important;
    display: ${props => (hidePrint ? 'none' : null)};
  }`

const large = css`
  font-family: 'Roboto Mono';
  font-weight: 300;
`

const small = css`
  font-family: 'Cutive Mono';
  font-weight: 400;
`

export const Icon = ({ name }) => <i className="material-icons">{name}</i>

export const Space = styled.span`
  width: 2rem;
  display: inline-block;
`

export const Hero = styled.h1`
  ${common}
  ${large}
  font-size: 52pt;
  color: whitesmoke;
  width: 100%;
  text-align: center;

  @media print {
    color: #444444;
    margin: .2rem;
  }
`

export const Heading = styled.h1`
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
    margin: .2rem;
    font-size: 16pt;
  }
`

export const Title = styled.h3`
  ${common}
  ${large}

  @media print {
    margin-top: .1rem;
  }
`

export const Subtitle = styled.h5`${common} ${large}`

const BodyContainer = styled.p`${common} ${small}`

export const Body = ({ children }) =>
  <BodyContainer>
    {React.Children.map(children, c => emojify(`${c}`, { output: 'unicode' }))}
  </BodyContainer>

export const Link = styled.a`
  ${common}
  ${small}

  font-family: 'Roboto Mono';
  color: ${props => (props.white ? 'whitesmoke' : 'cornflowerblue')};

  ${props => props.heading && css`padding: 0 1rem`};

  @media print {
    color: #444444;
  }
`

export const Description = BodyContainer.extend`
  white-space: pre-line;

  @media print {
    font-size: 10pt;
  }
`

export const Point = styled.li`
  ${common}
  ${small}

  list-style: none;
  padding-bottom: .5rem;
`

export const PrintLink = Link.extend`
  display: none;
  font-size: 10pt;
  margin-left: 1rem;
  text-decoration: none;
  font-style: italic;

  @media print {
    display: initial;
  }
`
