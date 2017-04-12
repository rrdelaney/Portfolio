import glamorous from 'glamorous'

export default glamorous.div(props => ({
  backgroundColor: 'whitesmoke',
  maxWidth: '400px',
  minWidth: '400px',
  padding: '1rem',
  margin: props.center ? '0 auto' : '1rem',
  boxShadow: 'rgba(0, 0, 0, .2) 2px 2px 4px 2px'
}))
