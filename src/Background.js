import React from 'react'
import glamorous from 'glamorous'
import Trianglify from 'trianglify'

const ParallaxContainer = glamorous.div({
  height: '100vh',
  width: '100vw',
  perspective: '1px',
  overflowX: 'hidden',
  overflowY: 'auto'
})

const parallaxLayer = {
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0'
}

const ParallaxBase = glamorous.div({
  ...parallaxLayer,
  transform: 'translateZ(0)'
})

const ParallaxBack = glamorous.div({
  ...parallaxLayer,
  transform: 'translateZ(-1px) scale(2)'
})

export default class Background extends React.Component {
  state = {
    bgImg: ''
  }

  createImg () {
    const triangles = Trianglify({
      width: window.innerWidth,
      height: this._baseContainer.clientHeight
    })

    return triangles.png()
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
      <ParallaxContainer>
        <ParallaxBack>
          <img alt='' src={this.state.bgImg} />
        </ParallaxBack>
        <ParallaxBase innerRef={c => { this._baseContainer = c }}>
          {this.props.children}
        </ParallaxBase>
      </ParallaxContainer>
    )
  }
}
