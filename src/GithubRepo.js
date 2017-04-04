import React from 'react'
import { Card } from 'belle'
import { Title, Body } from './Typo'

const getRepo = (owner, name) =>
  fetch(`https://api.github.com/repos/${owner}/${name}`).then(_ => _.json())

export default class GithubRepo extends React.PureComponent {
  state = {
    loading: true,
    data: null
  }

  async componentDidMount () {
    const {
      stargazers_count: stars,
      html_url: url,
      description,
      language,
    } = await getRepo(this.props.owner, this.props.name)

    this.setState({
      loading: false,
      data: { stars, url, language, description }
    })
  }

  render () {
    if (this.state.loading) return null
    const { stars, url, language, description } = this.state.data

    return (
      <Card>
        <Title>
          <a href={url}>
            {this.props.name}
          </a>
        </Title>
        <Body>{description}</Body>
        <Body>
          Stars: {stars}
          Lang: {language}
        </Body>
      </Card>
    )
  }
}
