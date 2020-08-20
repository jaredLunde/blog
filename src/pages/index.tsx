import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Column} from '@dash-ui/react-layout'
import {Spinner} from '../design-system/spinner'
const Blog = React.lazy(() => import('./blog'))
const Category = React.lazy(() => import('./category'))
const Resume = React.lazy(() => import('./resume'))
const BookClub = React.lazy(() => import('./book-club'))
const Tagged = React.lazy(() => import('./tagged'))

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

        <Route path='/'>
          <Blog />
        </Route>

        <Route path='posts'>
          <Route path='/'>
            <Blog />
          </Route>

          <Route path=':category'>
            <Route path='/'>
              <Category />
            </Route>

            <Route path=':slug'>
              <Blog />
            </Route>
          </Route>

          <Route path='tagged'>
            <Route path=':tag'>
              <Tagged />
            </Route>
          </Route>
        </Route>
      </Routes>
    </React.Suspense>
  )
}
