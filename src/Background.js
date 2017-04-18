import React from 'react'
import glamorous from 'glamorous'
import Trianglify from 'trianglify'

const BackgroundContainer = glamorous.div(props => ({
  height: '100vh',
  width: '100vw',
  overflow: 'auto',
  backgroundImage: props.bgImg,
  backgroundColor: props.bgImg ? null : 'grey'
}))

export default class Background extends React.Component {
  state = {
    bgImg: ''
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
    this.updateBackground()
    window.addEventListener('resize', this.updateBackground.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBackground.bind(this))
  }

  render () {
    return (
      <BackgroundContainer bgImg={this.state.bgImg}>
        <br />
        {this.props.children}
      </BackgroundContainer>
    )
  }
}
