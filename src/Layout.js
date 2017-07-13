import styled from 'styled-components'

export default styled.div`
  display: flex;
  padding: 0 5vw;
  justify-content: center;
  flex-wrap: wrap;

  @media print {
    padding: 0;
  }
`

export const PrintGrid = styled.div`
  @media print {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: auto;
    align-items: start;
  }
`

export const PrintGridColumn = styled.div`
  @media print {
    grid-column-start: ${props => props.col};
    grid-row-start: 1;
  }
`
