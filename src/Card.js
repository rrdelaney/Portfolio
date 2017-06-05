import glamorous from 'glamorous'

export default glamorous.div(props => ({
  backgroundColor: props.transparent ? '' : 'whitesmoke',
  color: props.transparent ? 'whitesmoke' : '#444444',
  borderTop: props.transparent ? '1px solid whitesmoke' : '',
  borderBottom: props.transparent ? '1px solid whitesmoke' : '',
  maxWidth: props.wide ? '600px' : '400px',
  width: '90vw',
  padding: props.noBottom ? '1rem 1rem 0' : '1rem',
  margin: props.center ? '0 auto' : '1rem',
  boxShadow: props.transparent ? '' : 'rgba(0, 0, 0, .2) 2px 2px 4px 2px',
  display: props.wide ? 'flex' : 'block',
  justifyContent: props.wide ? 'space-between' : null,
  '@media print': {
    boxShadow: 'none',
    border: '1px solid grey',
    padding: '10px',
    margin: '10px'
  }
}))

export const CardImg = glamorous.img(props => ({
  width: props.side ? '50%' : 'calc(100% + 2rem)',
  height: props.side ? '100%' : null,
  '@media print': {
    display: 'none'
  }
}))
