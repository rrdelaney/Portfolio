import React from 'react'
import glamorous from 'glamorous'
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
          description="An IDE for novels"
          img="rpi.jpg"
        />
        <Project
          swapped
          name="Todd App"
          url="https://todd-testing.firebaseapp.com/"
          description="The programmable to-do app"
          img="seattle.jpg"
        />
      </CardLayout>
      <Heading>Open Source</Heading>
      <CardLayout>
        <GithubRepo owner="rrdelaney" name="material-resume" />
        <GithubRepo owner="rrdelaney" name="horizon-devtools" />
        <GithubRepo owner="rrdelaney" name="HzQL" />
        <GithubRepo owner="rrdelaney" name="bs-loader" />
        <GithubRepo owner="rrdelaney" name="reyle" />
        <GithubRepo owner="superfeed" name="superfeed" />
      </CardLayout>
    </Background>
  )
}
