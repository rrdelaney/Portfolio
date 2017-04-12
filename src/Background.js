import React from 'react'
import Trianglify from 'trianglify'

const backgroundStyles = {
  height: '100vh',
  width: '100vw',
  overflow: 'auto'
}

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
      <div style={{ ...backgroundStyles, backgroundImage: this.state.bgImg }}>
        <br />
        {this.props.children}
      </div>
    )
  }
}
