import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Column} from '@dash-ui/react-layout'
import {Spinner} from '../design-system/spinner'
const Blog = React.lazy(() => import('./blog'))
const Resume = React.lazy(() => import('./resume'))
const BookClub = React.lazy(() => import('./book-club'))
const Tags = React.lazy(() => import('./tags'))

export function Pages() {
  return (
    <React.Suspense
      fallback={
        <Column width='100%' align='center' pad={['xl', 'none']}>
          <Spinner size='2em' />
        </Column>
      }
    >
      <Routes basename='/'>
        <Route path='book-club/*'>
          <BookClub />
        </Route>

        <Route path='resume'>
          <Resume />
        </Route>

        <Route path='tag/:slug'>
          <Tags />
        </Route>

        <Route path='post/:slug'>
          <Blog />
        </Route>

        <Route path='/'>
          <Blog />
        </Route>
      </Routes>
    </React.Suspense>
  )
}
