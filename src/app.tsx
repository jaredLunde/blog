import React from 'react'
import {Route, Switch, Link, useRouteMatch} from 'react-router-dom'
import {visuallyHidden} from '@accessible/visually-hidden'
import {Box, Column} from '@dash-ui/react-layout'
import transition from '@dash-ui/transition'
import BlogIcon from '@assets/blog-icon.svg'
import ResumeIcon from '@assets/resume-icon.svg'
// import BookClubIcon from '@assets/book-club-icon.svg'
import GitHubIcon from '@assets/github-icon.svg'
import InstagramIcon from '@assets/instagram-icon.svg'
import TwitterIcon from '@assets/twitter-icon.svg'
import {Text} from '@design-system/text'
import {Icon} from '@design-system/icon'
import {Image} from '@design-system/image'
import {styles} from '@design-system/styles'
import {Tabs, TabList, Tab, tabs} from '@design-system/tabs'
import {Spinner} from '@design-system/spinner'
import {useScrollToTop} from '@hooks/scroll-to-top'
import * as pages from './pages'

export function App() {
  useScrollToTop()

  return (
    <Column align='center'>
      <SkipNav />
      <Header />
      <TabNav />
      <Box
        as='main'
        id='main-content'
        role='main'
        width={{min: '100%', md: '72ch'}}
        pad={{min: 'lg', sm: 'xl'}}
      >
        <React.Suspense
          fallback={
            <Column width='100%' align='center' pad={['xl', 'none']}>
              <Spinner size='2em' />
            </Column>
          }
        >
          <Switch>
            <Route path='/resume' children={<pages.Resume />} />
            <Route path='/contact' children={<pages.Contact />} />
            <Route path='/posts/tagged/:tag' children={<pages.Tagged />} />
            <Route path='/posts/:category/:slug' children={<pages.Blog />} />
            <Route path='/posts/:category' children={<pages.Category />} />
            <Route path='/' children={<pages.Blog />} />
          </Switch>
        </React.Suspense>
      </Box>
    </Column>
  )
}

function Header() {
  // @ts-ignore
  const {isExact: isRoot} = useRouteMatch('/')
  const isResume = useRouteMatch('/resume')

  return (
    <Column as='header' align='center' bg='white' width='100%'>
      <Column
        gap='xl'
        pad={{min: 'lg', sm: ['lg', 'xl', 'lg']}}
        width={{min: '100%', md: '72ch'}}
      >
        <Column gap='xl' align='start' height='100%'>
          <div
            className={styles.join(
              imageContainer.css(),
              scale.css(isRoot ? 'in' : 'out')
            )}
          >
            <Image
              alt='A picture of a beach in Nusa Dua, Bali'
              placeholder={import('@assets/bali.720.jpg')}
              src={import('@assets/bali.720.jpg')}
              width='100%'
              elevation='inner'
            />
          </div>

          <Column gap='lg'>
            <div>
              <Text as='h1' variant='heading'>
                Jared Lunde
              </Text>
              <Text as='h2' variant='headingSm'>
                UI Engineer &amp; Creative
              </Text>
            </div>

            {!isResume ? (
              <p>
                I write code, read things, design, eat, think, and frequently
                hyperbolize on{' '}
                <a href='https://twitter.com/jaredLunde'>Twitter</a>. Now I
                write words here, too, but with slightly more nuance.
              </p>
            ) : (
              <Text as='h3' size='lg'>
                Pragmatic engineer with a diverse technical background. Long
                history of creating DX-focused software emphasizing reliable,
                rapid deployment.
              </Text>
            )}
          </Column>
        </Column>
      </Column>
    </Column>
  )
}

const scale = transition(styles, {
  default: ({transition}) => ({
    duration: transition.duration.slow,
    timing: transition.timing.inOut,
  }),
  in: {
    scale: 1,
    height: 300,
    opacity: 1,
  },
  out: {
    height: 0,
  },
})

const imageContainer = styles.one(({radius}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: radius.primary,
  width: '100%',
  maxWidth: '100%',

  picture: {
    minHeight: '100%',
    maxWidth: 'none',
    width: 'auto',

    img: {
      width: 'auto',
      maxWidth: 'none',
    },
  },
}))

const tabTo = ['/', /*'/book-club',*/ '/resume']

function TabNav() {
  const matchesResume = useRouteMatch('/resume')
  // const {isExact: matchesBookClub} = useRouteMatch('/book-club/*')
  const active = matchesResume ? 1 : 0

  return (
    <Tabs active={active} manualActivation>
      <TabList as='nav' className={tabNav()}>
        <Tab as={Link} index={0} to={tabTo[0]}>
          <Icon render={BlogIcon} />
          <span>Blog</span>
        </Tab>
        {/*<Tab as={Link} index={1} to={tabTo[1]}>
          <Icon render={BookClubIcon} />
          <span>Book club</span>
    </Tab>*/}
        <Tab
          as={Link}
          index={1}
          to={tabTo[1]}
          onMouseEnter={() => import('./pages/resume')}
        >
          <Icon render={ResumeIcon} />
          <span>Resume</span>
        </Tab>
        <a href='https://github.com/jaredLunde' className={tabs.tab('icon')}>
          <Icon render={GitHubIcon} />
        </a>
        <a href='https://instagram.com/jaredLunde' className={tabs.tab('icon')}>
          <Icon render={InstagramIcon} />
        </a>
        <a href='https://twitter.com/jaredLunde' className={tabs.tab('icon')}>
          <Icon render={TwitterIcon} />
        </a>
      </TabList>
    </Tabs>
  )
}

const tabNav = styles.one(({color, z}) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: color.contentBgColor,
  zIndex: z.max,
}))

function SkipNav() {
  return (
    <a href='#main-content' className={skipNav()}>
      Skip to main content
    </a>
  )
}

const skipNav = styles.one(({pad}) => ({
  ...visuallyHidden,
  '.using-keyboard &:focus': {
    clip: 'inherit',
    height: 'auto',
    width: 'auto',
    margin: 0,
    padding: pad.md,
    overflow: 'inherit',
    position: 'relative',
  },
}))
