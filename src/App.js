import React from 'react'
import GithubRepo from './GithubRepo'
import Background from './Background'
import { Hero } from './Typo'

export default function App () {
  return (
    <Background>
      <Hero>Ryan Delaney</Hero>
      <GithubRepo owner='rrdelaney' name='material-resume' />
    </Background>
  )
}
