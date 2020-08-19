import React from 'react'
import {Link, useMatch, useNavigate} from 'react-router-dom'
import {Box, Column} from '@dash-ui/react-layout'
import BlogIcon from '@assets/blog-icon.svg'
import ResumeIcon from '@assets/resume-icon.svg'
import BookClubIcon from '@assets/book-club-icon.svg'
import GitHubIcon from '@assets/github-icon.svg'
import InstagramIcon from '@assets/instagram-icon.svg'
import TwitterIcon from '@assets/twitter-icon.svg'
import {Text} from '@design-system/text'
import {Icon} from '@design-system/icon'
import {Image} from '@design-system/image'
import {styles} from '@design-system/styles'
import {Tabs, TabList, Tab, tabs} from '@design-system/tabs'
import {Pages} from '@pages'

export function App() {
  return (
    <Column align='center'>
      <Column align='center' bg='white' width='100%'>
        <Column
          gap='xl'
          pad={{min: 'lg', sm: ['lg', 'xl', 'lg']}}
          width={{min: '100%', md: '72ch'}}
        >
          <Column gap='xl' align='start' height='100%'>
            <Image
              alt='A picture of a beach in Nusa Dua, Bali'
              placeholder={import('@assets/bali.placeholder.jpg')}
              srcSet={{
                min: import('@assets/bali.560.jpg'),
                md: import('@assets/bali.560.jpg'),
                lg: import('@assets/bali.720.jpg'),
              }}
              width='100%'
              elevation='inner'
              radius='primary'
            />
            <Column gap='lg'>
              <div>
                <Text as='h1' variant='heading'>
                  Jared Lunde
                </Text>
                <Text as='h2' variant='headingSm'>
                  UI Engineer &amp; Creative
                </Text>
              </div>

              <p>
                I write code, read things, take photos, eat, think, and
                frequently hyperbolize on{' '}
                <a href='https://twitter.com/jaredLunde'>Twitter</a>. Now I
                write words here, too, but with slightly more nuance.
              </p>
            </Column>
          </Column>
        </Column>
      </Column>

      <TabNav />

      <Box width={{min: '100%', md: '72ch'}} pad={{min: 'lg', sm: 'xl'}}>
        <Pages />
      </Box>
    </Column>
  )
}

const tabTo = ['/', '/resume', '/book-club']

const TabNav = () => {
  const matchesResume = useMatch('/resume/*')
  const matchesBookClub = useMatch('/book-club/*')
  const navigate = useNavigate()
  const active = matchesResume ? 1 : matchesBookClub ? 2 : 0
  console.log('wtf??', tabNav())
  return (
    <Tabs
      active={active}
      manualActivation
      onChange={(index) => {
        // Needs an `onChange` handler here because the space key
        // which activates tabs _will not_ trigger clicks on links
        index !== undefined && navigate(tabTo[index])
      }}
    >
      <TabList as='nav' className={tabNav()}>
        <Tab as={Link} index={0} to={tabTo[0]}>
          <Icon render={BlogIcon} />
          <span>Blog</span>
        </Tab>
        <Tab as={Link} index={2} to={tabTo[2]}>
          <Icon render={BookClubIcon} />
          <span>Book club</span>
        </Tab>
        <Tab as={Link} index={1} to={tabTo[1]}>
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
