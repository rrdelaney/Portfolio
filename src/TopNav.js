import React, { Component } from 'react'
import glamorous from 'glamorous'
import { Link } from './Typo'

const NavBar = glamorous.div(props => ({
  position: 'absolute',
  backgroundColor: props.clear ? 'rgba(0, 0, 0, 0)' : 'white',
  height: '3rem',
  width: '100vw',
  top: props.isVisible ? 0 : '-3rem',
  padding: '1rem 2rem 0',
  transition: 'top .5s ease-out, background-color .5s ease-out'
}))

export default class TopNav extends Component {
  state = {
    isVisible: false
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ isVisible: true })
    }, 500)
  }

  render () {
    return <NavBar clear={this.props.isTop} isVisible={this.state.isVisible}>
      <Link heading white={this.props.isTop} href='https://github.com/rrdelaney'>Github</Link>
      <Link heading white={this.props.isTop} href='https://twitter.com/_rydelan'>Twitter</Link>
    </NavBar>
  }
}
