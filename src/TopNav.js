import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from './Typo'

const NavBar = styled.div`
  z-index: 999;
  position: fixed;
  background-color: ${props =>
    props.clear ? 'rgba(0, 0, 0, 0)' : 'whitesmoke'};
  height: 3rem;
  width: 100vw;
  top: ${props => (props.isVisible ? 0 : '-3rem')};
  padding-top: 1rem;
  margin-right: -2rem;
  transition: top .5s ease-out, background-color .5s ease-out;

  @media print {
    display: none;
  }
`

export default class TopNav extends Component {
  state = {
    isVisible: false,
    isTop: true
  }

  styleOnScroll = () => {
    this.setState({
      isTop: window.scrollY < 10
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.styleOnScroll)

    this.isVisibleTimeout = setTimeout(() => {
      this.setState({ isVisible: true })
    }, 500)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.styleOnScroll)
    if (this.isVisibleTimeout) clearTimeout(this.isVisibleTimeout)
  }

  render() {
    const links = this.props.links.filter(l => !l.right).map(l =>
      <Link
        key={l.text}
        heading
        white={this.state.isTop}
        href={l.href}
        onClick={l.onClick}
      >
        {l.text}
      </Link>
    )

    const rightLinks = this.props.links.filter(l => !!l.right).map(l =>
      <Link
        key={l.text}
        heading
        hidePrint
        white={this.state.isTop}
        href={l.href}
        onClick={l.onClick}
        style={{ float: 'right' }}
      >
        {l.text}
      </Link>
    )

    return (
      <NavBar clear={this.state.isTop} isVisible={this.state.isVisible}>
        {links}
        {rightLinks}
      </NavBar>
    )
  }
}
