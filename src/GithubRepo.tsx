import * as React from 'react'
import styled from 'styled-components'
import { Card } from './Card'
import {
  Title,
  Body,
  Description,
  Subtitle,
  Icon,
  Space,
  Link,
  PrintLink
} from './Typo'

const PrintDescription = styled(Description)`
  display: none;

  @media print {
    display: block;
  }
`

interface RepoData {
  stargazers_count: number
  html_url: string
  description: string
  language: string
}

async function getRepo(owner: string, name: string) {
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

  return JSON.parse(localStorage[cacheRepoName]) as RepoData
}

function tryCache(owner: string, name: string) {
  const cacheRepoName = `repo:${owner}/${name}`
  const repoData = localStorage[cacheRepoName]

  return repoData ? (JSON.parse(repoData) as RepoData) : undefined
}

export interface GithubRepoProps {
  owner: string
  name: string
  hidePrint?: boolean
  printDescription?: string
}

export interface GithubRepoState {
  stars: number | null
  url: string | null
  description: string | null
  language: string | null
}

export class GithubRepo extends React.PureComponent<
  GithubRepoProps,
  GithubRepoState
> {
  state: GithubRepoState = {
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
    const { hidePrint, printDescription } = this.props
    const { stars, url, language, description } = this.state

    return (
      <Card hidePrint={hidePrint}>
        <Title>
          <Link href={url!}>{this.props.name}</Link>
          <PrintLink href={url!}>{url}</PrintLink>
        </Title>
        <Subtitle hidePrint>
          <Icon name="code" /> {language}
          <Space />
          <Icon name="star" /> {stars}
        </Subtitle>
        <Body hidePrint={!!printDescription}>{description}</Body>
        {printDescription && (
          <PrintDescription>{printDescription}</PrintDescription>
        )}
      </Card>
    )
  }
}
