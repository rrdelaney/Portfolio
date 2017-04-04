import React from 'react'
import Trianglify from 'trianglify'

export default class Background extends React.Component {
  state = {
    bgImg: this.createImg()
  }

  createImg () {
    const triangles = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
    })

    return `url(${triangles.png()})`
  }

  updateBackground () {
    this.setState({ bgImg: this.createImg() })
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateBackground.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBackground.bind(this))
  }

  render () {
    return (
      <div style={{ backgroundImage: this.state.bgImg, height: '100vh', width: '100vw' }}>
        {this.props.children}
      </div>
    )
  }
}
