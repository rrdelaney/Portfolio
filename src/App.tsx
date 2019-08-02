import React, { Component } from 'react'
import dedent from 'dedent'
import { Background } from './Background'
import { TopNav } from './TopNav'
import { About } from './About'
import { Project } from './Project'
import { DataCard } from './DataCard'
import { Work } from './Work'
import { GithubRepo } from './GithubRepo'
import { Layout, Box, PrintGrid, PrintGridColumn } from './Layout'
import { Hero, Heading, Break } from './Typo'

export class App extends Component {
  aboutContent = dedent`
    Developer currently @ Google

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
      onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        window.print()
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
    Languages: ['TypeScript', 'JS', 'Reason', 'Scala', 'Python', 'PHP'],
    Frameworks: ['React', 'Angular', 'gRPC', 'GraphQL', 'Django'],
    Databases: ['Postgres', 'MySQL', 'MongoDB', 'Firebase']
  }

  google = [
    'Working on fiber network visualization tool for internal customers',
    'Primarily work on frontend using Angular, use Go for backend business APIs',
    'Write comprehensive integration testing suites for each feature using Protractor and screenshot tests',
    'Design data-heavy visualizations and UI for stakeholder review',
    "Involved in TypeScript community at Google, teach TypeScript class and lead workshops for other Googlers, review other's TypeScript Code",
    'Creating Google-internal component toolkit focused on data visualization for Angular apps'
  ]

  microsoft = [
    'Worked on greenfield CMS for Office documentation',
    'Feature work spanned stack from frontend to database level',
    'Lead frontend migration to React and GraphQL',
    'Migrated team to Git and ran workshops to onboard developers',
    "Contributed to Microsoft's React Component toolkit"
  ]

  datto = [
    'Worked on web app managing fleet of backup devices',
    'Worked in an existing codebase to add new features and fix bugs',
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
      <Background>
        <Hero>Ryan Delaney</Hero>
        <TopNav links={this.topLinks} />
        <PrintGrid>
          <About>{this.aboutContent}</About>
          <PrintGridColumn col={2}>
            <Heading>Work</Heading>
            <Work
              company="Google"
              position="Software Engineer"
              time="September 2017 - Present"
              data={this.google}
            />
            <Work
              company="Microsoft"
              position="Software Engineer"
              time="August 2016 - September 2017"
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
            <Heading hidePrint>Projects</Heading>
            <Layout>
              <Project
                hidePrint
                name="Framework Press"
                url="https://framework.press"
                description={this.frameworkDescription}
                img="framework.png"
              />
            </Layout>
            <Heading>Open Source</Heading>
            <Layout>
              <GithubRepo
                owner="rrdelaney"
                name="ReasonablyTyped"
                printDescription={this.reasonablyTypedDescription}
              />
              <GithubRepo hidePrint owner="rrdelaney" name="reason-scripts" />
              <GithubRepo hidePrint owner="rrdelaney" name="bs-loader" />
              <GithubRepo hidePrint owner="rrdelaney" name="reason-dre" />
              <GithubRepo hidePrint owner="rrdelaney" name="material-resume" />
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
