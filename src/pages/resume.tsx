import React from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {Grid, GridItem, Row, Column} from '@dash-ui/react-layout'
import {slugify} from 'proser'
import {Text} from '@design-system/text'
import {Icon} from '@design-system/icon'
import {Divider} from '@design-system/divider'
import {mq} from '@design-system/mq'
import {styles} from '@design-system/styles'
import ExternaLinkIcon from '@assets/external-link.svg'
import AnchorIcon from '@assets/link.svg'

function Resume() {
  return (
    <Column gap='xxl'>
      <Helmet>
        <title>Resume / UI Engineer / Jared Lunde</title>
        <meta
          name='description'
          content={`Want to know more about my professional experience? Check out my resume here.`}
        />
        <link rel='canonical' href={`https://jaredlunde.com/resume`} />
      </Helmet>

      <Column as='section' gap='lg'>
        <SectionHeading emoji='🔆'>Career highlights</SectionHeading>

        <SkillCard title='Grit'>
          <li>Self-employed majority of professional career</li>
          <li>
            Engineered, grew, exited two self-funded, high traffic websites
          </li>
          <li>Self-taught, focused on design patterns and computation</li>
        </SkillCard>

        <SkillCard title='Library and app code'>
          <li>
            <b>13 years</b> shipping web applications
          </li>
          <li>
            <b>6 years</b> programming in{' '}
            <ExternalLink href='https://reactjs.org/'>React</ExternalLink>
          </li>
          <li>
            <b>110+</b> public{' '}
            <ExternalLink href='https://github.com/jaredLunde?tab=repositories'>
              GitHub repos
            </ExternalLink>
          </li>
          <li>
            <b>100,000+</b> weekly NPM downloads
          </li>
        </SkillCard>

        <SkillCard title='UI/UX'>
          <li>
            <b>2 years</b> in design systems
          </li>
          <li>
            <b>13 years</b> in creating user experiences
          </li>
          <li>Laser-focused on WAI-ARIA accessibility patterns</li>
        </SkillCard>
      </Column>

      <Column as='section' gap='lg'>
        <SectionHeading>Technical competencies</SectionHeading>

        <CompetencyCard title='Languages'>
          TypeScript, Node.js, Python, HTML, CSS, SQL, GraphQL, Bash
        </CompetencyCard>

        <CompetencyCard title='Libraries'>
          React, Styled Components, Jest, Apollo, Serverless Framework, Webpack,
          Snowpack, Rollup, Babel, Express, Flask, Redis, PostgreSQL, FFMPEG,{' '}
          and <i>many</i> more
        </CompetencyCard>

        <CompetencyCard title='AWS'>
          Lambda, API Gateway, RDS, VPC, CloudFormation, Route 53, S3,
          CloudFront, ElastiCache, SNS, SQS, Parameter Store
        </CompetencyCard>
      </Column>

      <Column as='section' gap='lg'>
        <SectionHeading>Open source</SectionHeading>

        <Grid
          as='ul'
          cols={2}
          distributeX='stretch'
          gap={{min: 'sm', sm: 'md'}}
        >
          <LibraryCard
            name='dash-ui'
            organization='dash-ui'
            tooling={['TypeScript', 'CSS', 'Babel']}
          >
            Framework-agnostic, design system-focused CSS-in-JS libraries and
            tooling
          </LibraryCard>

          <LibraryCard
            name='accessible-ui'
            organization='accessible-ui'
            tooling={['React', 'TypeScript']}
          >
            Headless React components and hooks enacting WAI-ARIA best practices
          </LibraryCard>

          <LibraryCard
            name='react-hook'
            repo='react-hook'
            tooling={['React', 'TypeScript']}
          >
            Strongly typed React hooks for function components
          </LibraryCard>

          <LibraryCard
            name='masonic'
            repo='masonic'
            tooling={['React', 'TypeScript', 'Algorithms']}
          >
            High performance virtual masonry layouts for React
          </LibraryCard>

          <LibraryCard
            name='jaredLunde/blog'
            colStart={1}
            colEnd={3}
            repo='blog'
            tooling={['React', 'TypeScript', 'CSS', 'Snowpack', 'Storybook']}
          >
            <span aria-hidden>👋</span> See the code that went into making this
            website
          </LibraryCard>
        </Grid>
      </Column>

      <Column as='section' gap='lg'>
        <SectionHeading>Professional experience</SectionHeading>

        <ExperienceCard
          companyName='Admiral'
          titles={[`Senior Frontend Engineer`]}
          startYear={2019}
          endYear='Present'
          link='https://getadmiral.com'
          tooling={[
            'React',
            'TypeScript',
            'Styled Components',
            'Figma',
            'Webpack',
            'Snowpack',
          ]}
        >
          <p>
            Implemented design systems and build tooling across company products
            including content management dashboards, privacy consent management,
            and digital subscriptions.
          </p>
          <Column as='ul' gap='sm'>
            <li>
              Modernized build tooling, positively impacting developer
              productivity, product reliability and bundle size
            </li>
            <li>
              Introduced accessibility features, protecting the company from{' '}
              <ExternalLink href='https://www.cnbc.com/2019/10/07/dominos-supreme-court.html'>
                liability issues
              </ExternalLink>{' '}
              while championing inclusivity
            </li>
            <li>
              Implemented the company&apos;s first{' '}
              <ExternalLink href='https://www.lightningdesignsystem.com/design-tokens/'>
                token-driven
              </ExternalLink>{' '}
              design system and component library, providing products a cohesive
              brand story
            </li>
          </Column>
        </ExperienceCard>

        <ExperienceCard
          companyName='Stellar'
          titles={['Fullstack Software Engineer', 'Founder']}
          startYear={2017}
          endYear={2019}
          tooling={[
            'React',
            'TypeScript',
            'Node.js',
            'GraphQL',
            'PostgreSQL',
            'AWS',
          ]}
        >
          <p>
            Founded lead generation firm in Denver, Colorado. Rapidly shipped
            beautiful, lightweight, accessible landing pages tailored around
            converting ad campaigns.
          </p>
          <Column as='ul' gap='sm'>
            <li>
              Engineered design systems, components, and build tooling around
              launching serverless landing pages for ad campaigns
            </li>
            <li>Delivered pages in &lt;3.5 sec TTI on slow 4G devices</li>
            <li>Generated up to 100 quality leads for clients each month</li>
          </Column>
        </ExperienceCard>

        <ExperienceCard
          companyName='Cool Story'
          description='MakeAGIF.com, MakeADare.com, et. al.'
          titles={['Fullstack Software Engineer', 'Co-Founder']}
          startYear={2010}
          endYear={2016}
          tooling={[
            'JavaScript',
            'Python',
            'SCSS',
            'MySQL',
            'Redis',
            'NGINX',
            'FFMPEG',
          ]}
        >
          <p>
            Technical co-founder of high traffic entertainment and social media
            websites. Designed, engineered, and scaled several web properties
            from zero to millions in daily visitors. Exited two properties via
            asset sales.
          </p>
          <Column as='ul' gap='sm'>
            <li>
              Consistently delivered 12 million page views to 1.8 million
              visitors per day with 99.99% uptime
            </li>
            <li>
              Reliably served media generating up to $1M in revenue per year at
              a 75% margin on infrastructure and bandwidth costs
            </li>
            <li>
              Encoded up to 5,000 videos and GIFs each day using HLS adaptive
              streaming to target a range of device and bandwidth capabilities
            </li>
          </Column>
        </ExperienceCard>
      </Column>

      <Divider />

      <h2 style={{textAlign: 'center'}}>
        Want to hear more?{' '}
        <Text as={Link} to='/contact' color='indigo600'>
          Contact me
        </Text>
      </h2>
    </Column>
  )
}

function SkillCard({title, children}: SkillCardProps) {
  return (
    <Column
      radius='primary'
      bg='white'
      gap='md'
      pad='lg'
      className={skillCard()}
    >
      <h3>{title}</h3>
      <Column as='ul' gap='sm'>
        {children}
      </Column>
    </Column>
  )
}

function CompetencyCard({title, children}: SkillCardProps) {
  return (
    <Column
      radius='primary'
      bg='white'
      gap='md'
      pad='lg'
      className={skillCard()}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </Column>
  )
}

function LibraryCard({
  name,
  colStart,
  colEnd,
  organization,
  repo,
  tooling = [],
  children,
}: LibraryCardProps) {
  return (
    <GridItem
      as='li'
      colStart={colStart}
      colEnd={colEnd}
      className={libraryCard()}
    >
      <Column
        as={ExternalLink}
        radius='primary'
        bg='gray800'
        gap='sm'
        pad={{min: 'md', sm: 'md', md: 'lg'}}
        className={skillCard()}
        href={
          organization
            ? `https://github.com/${organization}`
            : `https://github.com/jaredLunde/${repo}`
        }
      >
        <Text as='h3' color='current'>
          {name}
        </Text>
        <Text as='p' size='sm'>
          {children}
        </Text>

        <span className={skillCard.tooling()}>{tooling.join(', ')}</span>
      </Column>
    </GridItem>
  )
}

export interface LibraryCardProps {
  name: React.ReactNode
  organization?: React.ReactNode
  repo?: React.ReactNode
  colStart?: number
  colEnd?: number
  tooling?: string[]
  children: React.ReactNode
}

function ExperienceCard({
  companyName,
  description,
  titles,
  startYear,
  endYear,
  link,
  tooling = [],
  children,
}: ExperienceCardProps) {
  return (
    <Column
      radius='primary'
      bg='white'
      gap='md'
      pad='lg'
      className={skillCard()}
    >
      <div>
        <Row width='100%' align='center' distribute='between'>
          <h3>
            {companyName}{' '}
            {link && (
              <ExternalLink
                href={link}
                aria-label='Open "getadmiral.com" in a new tab'
              >
                <Icon
                  size='0.85em'
                  color='indigo600'
                  render={ExternaLinkIcon}
                />
              </ExternalLink>
            )}
          </h3>
          <Text
            size='base'
            aria-label={`Employed from ${startYear} to ${endYear}`}
          >
            {startYear} - {endYear}
          </Text>
        </Row>
        {description && <Text>{description}</Text>}
        <Text as='h4' color='gray600'>
          {titles.join(', ')}
        </Text>
      </div>

      <Column gap='lg'>
        {children}

        <Text size='sm' color='gray600'>
          {tooling.join(', ')}
        </Text>
      </Column>
    </Column>
  )
}

export interface ExperienceCardProps {
  companyName: React.ReactNode
  description?: React.ReactNode
  titles: string[]
  startYear: number
  endYear: number | 'Present'
  link?: string
  tooling?: string[]
  children: React.ReactNode
}

function SectionHeading({emoji, children}: SectionHeadingProps) {
  const id = slugify(children)
  return (
    <h2 id={id} className={sectionHeading()}>
      <a href={`#${id}`} className='anchor' aria-hidden>
        <Icon color='gray500' render={AnchorIcon} />
      </a>

      <Row as='span' gap='md'>
        {emoji && <span aria-hidden>{emoji}</span>}
        <span>{children}</span>
      </Row>
    </h2>
  )
}

export interface SectionHeadingProps {
  emoji?: React.ReactText
  children: string
}

function ExternalLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  // eslint-disable-next-line
  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

const skillCard = Object.assign(
  styles.one(({hairline, color}) => ({
    border: `${hairline} solid ${color.translucent}`,
  })),
  {
    tooling: styles.one(({color, font}) => ({
      color: color.indigo200,
      fontSize: font.size.sm,
    })),
  }
)

const libraryCard = styles.one(
  mq({
    default: ({color}) => ({
      listStyle: 'none',
      padding: 0,

      '::before': {
        width: 0,
        height: 0,
        left: 0,
      },

      '> a': {
        color: color.gray100,
        textDecoration: 'none',
        height: '100%',
        cursor: 'pointer',
      },

      h3: {
        fontWeight: '700',
      },

      '.using-keyboard & > a:focus': {
        color: color.gray100,
        textDecoration: 'underline',
      },
    }),

    hover: {
      '> a:hover h3': {
        textDecoration: 'underline',
      },
    },
  })
)

const sectionHeading = styles.one(
  mq({
    default: {
      '.anchor': {
        position: 'absolute',
        left: '-1em',
        fontSize: '0.9em',
        visibility: 'hidden',
      },
    },
    hover: {
      ':hover .anchor': {
        visibility: 'visible',
      },
    },
  })
)

export interface SkillCardProps {
  title: React.ReactNode
  children: React.ReactNode
}

export default Resume
