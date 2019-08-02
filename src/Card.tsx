import styled, { css } from 'styled-components'

export interface CardProps {
  transparent?: boolean
  wide?: boolean
  noBottom?: boolean
  center?: boolean
  hidePrint?: boolean
}

export const Card = styled.div<CardProps>`
  color: ${props => (props.transparent ? 'whitesmoke' : '#444444')};
  border-top: ${props => (props.transparent ? '1px solid whitesmoke' : 'none')};
  border-bottom: ${props =>
    props.transparent ? '1px solid whitesmoke' : 'none'};
  max-width: ${props => (props.wide ? '600px' : '400px')};
  width: 90vw;
  padding: ${props => (props.noBottom ? '1rem 1rem 0' : '1rem')};
  margin: ${props => (props.center ? '0 auto' : '1rem')};
  display: ${props => (props.wide ? 'flex' : 'block')};

  ${props =>
    !props.transparent &&
    css`
      background-color: whitesmoke;
      box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 4px 2px;

      @media print {
        background-color: white;
        box-shadow: none;
      }
    `} @media print {
    color: #444444;
    box-shadow: none;
    border-bottom: 1px solid #ddd !important;
    border-right: 1px solid #ddd !important;
    border-top: none;
    border-left: none;
    padding: 5px 10px 0 0;
    margin: 5px 10px 0 calc(10px + 0.2rem);
    width: 100%;
    max-width: none;
    background-color: white;
    display: ${props => (props.hidePrint ? 'none' : 'block')};
  }

  ${props =>
    props.wide &&
    css`
      justify-content: space-between;
    `};
`

export interface CardImgProps {
  side: boolean
  src: string
}

export const CardImg = styled.div<CardImgProps>`
  width: ${props => (props.side ? '50%' : 'calc(100% + 2rem)')};
  height: 100%;
  background-size: cover;
  background-image: url(${props => props.src});
  @media print {
    display: none;
  }
`
