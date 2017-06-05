import React from 'react'
import glamorous from 'glamorous'
import dedent from 'dedent'
import Background from './Background'
import TopNav from './TopNav'
import About from './About'
import Project from './Project'
import GithubRepo from './GithubRepo'
import { Hero, Heading } from './Typo'

const CardLayout = glamorous.div({
  display: 'flex',
  padding: '0 5vw',
  justifyContent: 'center',
  flexWrap: 'wrap'
})

const frameworkDescription = dedent`
  An IDE for novels. Gives users an embeddable an markup language with character analysis and formatting options. Also includes collab editing out of the box.

  Being developed with React, Firebase, and Google APIs.
`

// const toddDescription = dedent`
//   A programmable todo app. Uses a simple query langiage based off CoffeeScript to run querys against a set of todos.
//
//   Integrates with GitHub, VSTS, and other todo providers to give a simple query-able interface for all aspects.
//
//   Being developed with Angular 4.x, Angular Material, and Firebase.
// `

export default function App() {
  return (
    <Background>
      <TopNav />
      <Hero>Ryan Delaney</Hero>
      <About />
      <Heading>Projects</Heading>
      <CardLayout>
        <Project
          name="Framework Press"
          url="https://framework.press"
          description={frameworkDescription}
          img="framework.png"
        />
        {/* <Project
          swapped
          name="Todd App"
          url="https://todd-testing.firebaseapp.com/"
          description={toddDescription}
          img="seattle.jpg"
        /> */}
      </CardLayout>
      <Heading>Open Source</Heading>
      <CardLayout>
        <GithubRepo owner="rrdelaney" name="material-resume" />
        <GithubRepo owner="rrdelaney" name="ReasonablyTyped" />
        <GithubRepo owner="rrdelaney" name="bs-loader" />
        <GithubRepo owner="rrdelaney" name="horizon-devtools" />
        <GithubRepo owner="rrdelaney" name="HzQL" />
        <GithubRepo owner="superfeed" name="superfeed" />
      </CardLayout>
    </Background>
  )
}
