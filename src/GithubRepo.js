import React from 'react'

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
      language,
    } = await getRepo(this.props.owner, this.props.name)

    this.setState({
      loading: false,
      data: { stars, url, language }
    })
  }

  render () {
    if (this.state.loading) return null
    const { stars, url, language } = this.state.data

    return (
      <div>
        Stars: {stars}
        Lang: {language}
        <a href={url}>Link</a>
      </div>
    )
  }
}
