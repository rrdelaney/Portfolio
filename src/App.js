import React, { Component } from 'react'
import dedent from 'dedent'
import Background from './Background'
import TopNav from './TopNav'
import About from './About'
import Project from './Project'
import DataCard from './DataCard'
import Work from './Work'
import GithubRepo from './GithubRepo'
import Layout, { Box, PrintGrid, PrintGridColumn } from './Layout'
import { Hero, Heading, Break } from './Typo'

export default class App extends Component {
  aboutContent = dedent`
    Developer currently @ Microsoft

    Insterested in frontend development, programming languages, and improving developer experience
  `

  frameworkDescription = dedent`
    An IDE for novels. Gives users an embeddable an markup language with character analysis and formatting options. Also includes collab editing out of the box.

    Being developed with React, Firebase, and Google APIs.
  `

  reasonablyTypedDescription = dedent`
    A Flow and TypeScript library definition compiler for Reason and BuckleScript. It takes a module type definition and turns it into something types for Reason.

    Written in Reason and compiled to a native binary or JavaScript.
  `

  incyncDescription = dedent`
    Project for Hack MIT Fall 2015. An app for syncing presentations with your group! Finalists at Hack MIT, GE Best UX Prize, and Facebook award winners.
  `

  topLinks = [
    {
      printText: '516-281-6378',
      printIcon: 'phone'
    },
    {
      text: 'GitHub',
      printIcon: 'dev-github-plain',
      printText: 'rrdelaney',
      href: 'https://github.com/rrdelaney'
    },
    {
      text: 'Twitter',
      printIcon: 'dev-twitter-plain',
      printText: '_rrdelaney',
      href: 'https://twitter.com/_rrdelaney'
    },
    {
      printText: 'rrdelaney@outlook.com',
      printIcon: 'email'
    },
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

  education = [
    'Rensselaer Polytechic Institute',
    'Computer Science',
    'Computer Systems Engineering',
    'Class of 2016'
  ]

  achievements = [
    '2nd @ Facebook Global Hackathon Fall 2015',
    'HackMIT Finalist Fall 2015',
    'Best UI @ HackMIT Fall 2015',
    'Rensselaer Medal Award'
  ]

  tech = {
    Interests: ['Frontend', 'Compilers', 'Developer tools'],
    Languages: ['JavaScript', 'Reason', 'Scala', 'Python', 'PHP'],
    Frameworks: ['React', 'GraphQL', 'Angular', 'Django'],
    Databases: ['MongoDB', 'Postgres', 'Firebase']
  }

  microsoft = [
    'Working on CMS for Office documentation',
    'Leading frontend migration to React and GraphQL',
    'Work across stack, using React and GraphQL API hitting legacy DB',
    "Contribute to other team's libraries we depend on"
  ]

  datto = [
    'Worked on web app managing fleet of backup devices',
    'Used an existing codebase to add new features and fix bugs',
    'Wrote unit tests and negative tests for all added features',
    'Worked with PHP, Linux, and Symfony framework'
  ]

  union = [
    'Worked on a new Club Management System for the Student Union',
    'Wrote full-stack features, from frontend to database',
    'Used Python, Postgres, and Django'
  ]

  render() {
    return (
      <Background ref={c => (this.background = c)}>
        <Hero>Ryan Delaney</Hero>
        <TopNav links={this.topLinks} />
        <PrintGrid>
          <About>
            {this.aboutContent}
          </About>
          <PrintGridColumn col={2}>
            <Heading>Work</Heading>
            <Work
              company="Microsoft"
              position="Software Engineer"
              time="August 2016 - Present"
              data={this.microsoft}
            />
            <Work
              company="Datto"
              position="Software Engineering Intern"
              time="Summer 2015"
              data={this.datto}
            />
            <Work
              company="Rensselaer Union"
              position="Developer"
              time="Fall 2013 - Spring 2016"
              data={this.union}
            />
            <Work
              hidePrint
              company="Power Management Concepts"
              position="Intern"
              time="Summer 2014"
            />
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
              <GithubRepo hidePrint owner="rrdelaney" name="material-resume" />
              <GithubRepo
                owner="rrdelaney"
                name="ReasonablyTyped"
                printDescription={this.reasonablyTypedDescription}
              />
              <GithubRepo hidePrint owner="rrdelaney" name="bs-loader" />
              <GithubRepo hidePrint owner="rrdelaney" name="horizon-devtools" />
              <GithubRepo hidePrint owner="rrdelaney" name="HzQL" />
              <GithubRepo
                owner="USA-Hacks"
                name="inCync-Front"
                printDescription={this.incyncDescription}
              />
            </Layout>
          </PrintGridColumn>
          <PrintGridColumn col={1}>
            <Layout>
              <Box>
                <Heading smallPrint>Education</Heading>
                <DataCard data={this.education} />
              </Box>
              <Box>
                <Heading smallPrint>Awards</Heading>
                <DataCard data={this.achievements} />
              </Box>
            </Layout>
            <Heading smallPrint>Tech</Heading>
            <DataCard data={this.tech} />
          </PrintGridColumn>
        </PrintGrid>
        <Break hidePrint />
      </Background>
    )
  }
}
