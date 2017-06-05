import React, { Component } from 'react'
import dedent from 'dedent'
import Background from './Background'
import TopNav from './TopNav'
import About from './About'
import Project from './Project'
import GithubRepo from './GithubRepo'
import Layout from './Layout'
import { Hero, Heading } from './Typo'

export default class App extends Component {
  aboutContent = dedent`
    Developer currently @ Microsoft

    Insterested in frontend development, programming languages, and improving developer experience
  `

  frameworkDescription = dedent`
    An IDE for novels. Gives users an embeddable an markup language with character analysis and formatting options. Also includes collab editing out of the box.

    Being developed with React, Firebase, and Google APIs.
  `

  topLinks = [
    { text: 'GitHub', href: 'https://github.com/rrdelaney' },
    { text: 'Twitter', href: 'https://twitter.com/_rrdelaney' },
    {
      text: 'Résumé',
      href: '',
      right: true,
      onClick: async e => {
        e.preventDefault()
        await this.background.forcePrint(true)
        window.print()
        this.background.forcePrint(false)
      }
    }
  ]

  render() {
    return (
      <Background ref={c => (this.background = c)}>
        <TopNav links={this.topLinks} />
        <Hero>Ryan Delaney</Hero>
        <About>{this.aboutContent}</About>
        <Heading>Projects</Heading>
        <Layout>
          <Project
            name="Framework Press"
            url="https://framework.press"
            description={this.frameworkDescription}
            img="framework.png"
          />
        </Layout>
        <Heading>Open Source</Heading>
        <Layout>
          <GithubRepo owner="rrdelaney" name="material-resume" />
          <GithubRepo owner="rrdelaney" name="ReasonablyTyped" />
          <GithubRepo owner="rrdelaney" name="bs-loader" />
          <GithubRepo owner="rrdelaney" name="horizon-devtools" />
          <GithubRepo owner="rrdelaney" name="HzQL" />
          <GithubRepo owner="superfeed" name="superfeed" />
        </Layout>
      </Background>
    )
  }
}
