import React from 'react'
import GithubRepo from './GithubRepo'
import Background from './Background'

export default function App () {
  return (
    <Background>
      <GithubRepo owner='rrdelaney' name='material-resume' />
    </Background>
  )
}
