import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Column} from '@dash-ui/react-layout'
import {Spinner} from '../design-system/spinner'
const Blog = React.lazy(() => import('./blog'))
const Resume = React.lazy(() => import('./resume'))
const BookClub = React.lazy(() => import('./book-club'))
const Topics = React.lazy(() => import('./topics'))

export function Pages() {
  return (
    <React.Suspense
      fallback={
        <Column width='100%' align='center'>
          <Spinner size='2em' />
        </Column>
      }
    >
      <Routes basename='/'>
        <Route path='book-club/:slug?'>
          <BookClub />
        </Route>

        <Route path='book-club'>
          <BookClub />
        </Route>

        <Route path='resume'>
          <Resume />
        </Route>

        <Route path='blog/topic/:slug'>
          <Topics />
        </Route>

        <Route path='blog/:slug'>
          <Blog />
        </Route>

        <Route path='/'>
          <Blog />
        </Route>
      </Routes>
    </React.Suspense>
  )
}
