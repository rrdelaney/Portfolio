import React, { Component } from 'react'
import glamorous from 'glamorous'
import { Link } from './Typo'

const NavBar = glamorous.div(props => ({
  position: 'absolute',
  backgroundColor: 'white',
  height: '3rem',
  width: '100vw',
  top: props.isVisible ? 0 : '-3rem',
  transition: 'top .5s ease-out',
  padding: '1rem 2rem 0'
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
    return <NavBar isVisible={this.state.isVisible}>
      <Link href='https://github.com/rrdelaney'>Github</Link>
      <Link href='https://twitter.com/_rydelan'>Twitter</Link>
    </NavBar>
  }
}
