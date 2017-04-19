import React from 'react'
import glamorous from 'glamorous'
import Trianglify from 'trianglify'
import TopNav from './TopNav'

const BackgroundContainer = glamorous.div(props => ({
  height: '100vh',
  width: '100vw',
  overflow: 'auto',
  backgroundImage: props.bgImg,
  backgroundColor: props.bgImg ? null : 'grey',
  backgroundPositionY: props.bgOffset,
  transition: 'background-position-y .01s linear'
}))

export default class Background extends React.Component {
  state = {
    bgImg: '',
    isTop: true
  }

  createImg () {
    const triangles = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
    })

    return `url(${triangles.png()})`
  }

  styleOnScroll = () => {
    const isTop = this._bgContainer.scrollTop < 10
    const bgOffset = -Math.floor((this._bgContainer.scrollTop / this._bgContainer.scrollHeight) * window.innerHeight)
    console.log(this._bgContainer.scrollTop / this._bgContainer.scrollHeight)

    this.setState({ isTop, bgOffset })
  }

  updateBackground () {
    this.setState({ bgImg: this.createImg() })
  }

  componentDidMount () {
    this.updateBackground()
    window.addEventListener('resize', this.updateBackground.bind(this))
    this._bgContainer.addEventListener('scroll', this.styleOnScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateBackground.bind(this))
  }

  render () {
    return (
      <BackgroundContainer bgImg={this.state.bgImg} bgOffset={this.state.bgOffset} innerRef={c => { this._bgContainer = c }}>
        <TopNav isTop={this.state.isTop} />
        <br />
        {this.props.children}
      </BackgroundContainer>
    )
  }
}
