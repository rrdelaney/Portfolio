import React from 'react'
import { Parallax } from 'react-parallax'

export default class Background extends React.Component {
  state = {
    bgImg: 'spacex.jpg',
    isPrinting: false,
    hasMounted: false
  }

  componentDidMount() {
    this.mediaQuery = window.matchMedia('print')
    this.mediaQuery.addListener(this.onChange)
    this.setState({ hasMounted: true })
  }

  componentWillUnmount() {
    this.mediaQuery.removeListener(this.onChange)
  }

  onChange = ({ matches }) => {
    this.setState({ isPrinting: matches })
  }

  forcePrint = isPrinting =>
    new Promise(resolve => {
      this.setState({ isPrinting }, resolve)
    })

  render() {
    if (!this.state.bgImg) return null
    if (this.state.isPrinting) return <div>{this.props.children}</div>
    if (!this.state.hasMounted)
      return (
        <div style={{ backgroundImage: `url(${this.state.bgImg})` }}>
          <div style={{ height: '1px', width: '1px' }} />
          {this.props.children}
        </div>
      )

    return (
      <Parallax
        bgImage={this.state.bgImg}
        bgHeight="2000"
        bgWidth="3000"
        strength={400}
      >
        <br />
        {this.props.children}
      </Parallax>
    )
  }
}
