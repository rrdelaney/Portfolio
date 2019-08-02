import styled from 'styled-components'
import { Card } from './Card'

export const Layout = styled.div`
  display: flex;
  padding: 0 5vw;
  justify-content: center;
  flex-wrap: wrap;

  @media print {
    padding: 0;
  }
`

export const Box = styled.div`
  padding: 0 1rem;

  @media print {
    padding: 0;
  }
`

export const PrintGrid = styled.div`
  @media print {
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: auto;
    align-items: start;
  }
`

export interface PrintGridColumnProps {
  col: number
}

export const PrintGridColumn = styled.div<PrintGridColumnProps>`
  @media print {
    grid-column-start: ${props => props.col};
    grid-row-start: 1;
  }

  & ${Card} {
    @media print {
      width: ${props => (props.col === 1 ? 'inherit' : '100%')} !important;
    }
  }
`
