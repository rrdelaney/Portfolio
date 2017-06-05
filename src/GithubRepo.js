import React from 'react'
import Card from './Card'
import { Title, Body, Subtitle, Icon, Space, Link } from './Typo'

const getRepo = async (owner, name) => {
  const cacheRepoName = `repo:${owner}/${name}`
  const cacheETagName = `etag:${owner}/${name}`
  const cachedETag = localStorage[cacheETagName]

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${name}`,
    {
      headers: cachedETag ? { 'If-None-Match': cachedETag } : {}
    }
  )

  const newETag = response.headers.get('etag')
  localStorage[cacheETagName] = newETag

  if (response.status !== 304) {
    const newRepo = await response.json()
    localStorage[cacheRepoName] = JSON.stringify(newRepo)
  }

  return JSON.parse(localStorage[cacheRepoName])
}

const tryCache = (owner, name) => {
  const cacheRepoName = `repo:${owner}/${name}`
  const repoData = localStorage[cacheRepoName]

  return repoData && JSON.parse(repoData)
}

export default class GithubRepo extends React.PureComponent {
  state = {
    stars: null,
    url: null,
    description: null,
    language: null
  }

  tryLoadingCachedData() {
    const cachedData = tryCache(this.props.owner, this.props.name)

    if (cachedData) {
      this.setState({
        stars: cachedData.stargazers_count,
        url: cachedData.html_url,
        description: cachedData.description,
        language: cachedData.language
      })
    }

    return !!cachedData
  }

  async componentDidMount() {
    const didLoad = this.tryLoadingCachedData()

    if (!didLoad) {
      const {
        stargazers_count: stars,
        html_url: url,
        description,
        language
      } = await getRepo(this.props.owner, this.props.name)

      this.setState({
        stars,
        url,
        language,
        description
      })
    }
  }

  render() {
    const { stars, url, language, description } = this.state

    return (
      <Card>
        <Title>
          <Link href={url}>{this.props.name}</Link>
        </Title>
        <Subtitle>
          <Icon name="code" /> {language}
          <Space />
          <Icon name="star" /> {stars}
        </Subtitle>
        <Body>{description}</Body>
      </Card>
    )
  }
}
