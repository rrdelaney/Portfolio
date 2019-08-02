import * as React from 'react'
import styled from 'styled-components'
import { Icon, Link, PrintLink } from './Typo'

interface NavBarProps {
  clear: boolean
  isVisible: boolean
}

const NavBar = styled.div<NavBarProps>`
  z-index: 999;
  position: fixed;
  background-color: ${props =>
    props.clear ? 'rgba(0, 0, 0, 0)' : 'whitesmoke'};
  height: 3rem;
  width: 100vw;
  top: ${props => (props.isVisible ? 0 : '-3rem')};
  padding-top: 1rem;
  margin-right: -2rem;
  transition: top 0.5s ease-out, background-color 0.5s ease-out;

  @media print {
    position: inherit;
    background-color: rgba(0, 0, 0, 0);
    transition: none;
    top: 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
    padding-top: 0.2rem;
    height: auto;
    text-align: center;
  }
`

export interface Link {
  text?: string
  printText?: string
  printIcon?: string
  href?: string
  right?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export interface TopNavProps {
  links: Link[]
}

interface TopNavState {
  isVisible: boolean
  isTop: boolean
}

export class TopNav extends React.Component<TopNavProps, TopNavState> {
  isVisibleTimeout: number = 0

  state = {
    isVisible: false,
    isTop: true
  }

  readonly styleOnScroll = () => {
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
    const links = this.props.links
      .filter(l => !l.right)
      .map(l => (
        <span key={l.text || l.printText}>
          {l.text && (
            <Link
              hidePrint
              heading
              white={this.state.isTop}
              href={l.href}
              onClick={l.onClick}
            >
              {l.text}
            </Link>
          )}
          {l.printText && (
            <PrintLink href={l.href} style={{ fontStyle: 'normal' }}>
              <Icon name={l.printIcon!} />
              &nbsp;
              {l.printText}
            </PrintLink>
          )}
        </span>
      ))

    const rightLinks = this.props.links
      .filter(l => !!l.right)
      .map(l => (
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
      ))

    return (
      <NavBar clear={this.state.isTop} isVisible={this.state.isVisible}>
        {links}
        {rightLinks}
      </NavBar>
    )
  }
}
