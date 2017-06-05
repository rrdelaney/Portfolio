import React from 'react'
import dedent from 'dedent'
import Background from './Background'
import TopNav from './TopNav'
import About from './About'
import Project from './Project'
import GithubRepo from './GithubRepo'
import Layout from './Layout'
import { Hero, Heading } from './Typo'

const aboutContent = dedent`
  Developer currently @ Microsoft

  Insterested in frontend development, programming languages, and improving developer experience
`

const frameworkDescription = dedent`
  An IDE for novels. Gives users an embeddable an markup language with character analysis and formatting options. Also includes collab editing out of the box.

  Being developed with React, Firebase, and Google APIs.
`

const topLinks = [
  { text: 'GitHub', href: 'https://github.com/rrdelaney' },
  { text: 'Twitter', href: 'https://twitter.com/_rrdelaney' }
]

export default function App() {
  return (
    <Background>
      <TopNav links={topLinks} />
      <Hero>Ryan Delaney</Hero>
      <About>{aboutContent}</About>
      <Heading>Projects</Heading>
      <Layout>
        <Project
          name="Framework Press"
          url="https://framework.press"
          description={frameworkDescription}
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
