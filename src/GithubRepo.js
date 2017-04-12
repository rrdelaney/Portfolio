import React from 'react'
import Card from './Card'
import { Title, Body, Icon } from './Typo'

const getRepo = async (owner, name) => {
  const cacheRepoName = `repo:${owner}/${name}`
  const cacheETagName = `etag:${owner}/${name}`
  const cachedETag = localStorage[cacheETagName]

  const response = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    headers: cachedETag
      ? { 'If-None-Match': cachedETag }
      : {}
  })

  const newETag = response.headers.get('etag')
  localStorage[cacheETagName] = newETag

  if (response.status !== 304) {
    const newRepo = await response.json()
    localStorage[cacheRepoName] = JSON.stringify(newRepo)
  }

  return JSON.parse(localStorage[cacheRepoName])
}

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
      language
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
          <a href={url}>{this.props.name}</a>
        </Title>
        <Title>
          <Icon name='code' /> {language}
          <span style={{ width: '2rem', display: 'inline-block' }} />
          <Icon name='star' /> {stars}
        </Title>
        <Body>{description}</Body>
      </Card>
    )
  }
}
