import React from 'react'
import { Parallax } from 'react-parallax'
// import Trianglify from 'trianglify'

export default class Background extends React.Component {
  state = {
    bgImg: 'fb.jpg'
  }

  // createImg () {
  //   const triangles = Trianglify({
  //     width: window.innerWidth,
  //     height: window.innerHeight + 400
  //   })
  //
  //   return triangles.png()
  // }
  //
  // updateBackground () {
  //   this.setState({ bgImg: this.createImg() })
  // }
  //
  // componentDidMount () {
  //   this.updateBackground()
  //   window.addEventListener('resize', this.updateBackground.bind(this))
  // }
  //
  // componentWillUnmount () {
  //   window.removeEventListener('resize', this.updateBackground.bind(this))
  // }

  render () {
    if (!this.state.bgImg) return null

    return (
      <Parallax bgImage={this.state.bgImg} strength={400}>
        <br />
        {this.props.children}
      </Parallax>
    )
  }
}
