import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {DesignSystem} from './design-system/design-system'
import {App} from './app'
const Blog = React.lazy(() => import('./pages/blog/blog'))
const Category = React.lazy(() => import('./pages/blog/category'))
const Tagged = React.lazy(() => import('./pages/blog/tagged'))
const Resume = React.lazy(() => import('./pages/resume'))
const Contact = React.lazy(() => import('./pages/contact'))
const BookClub = React.lazy(() => import('./pages/book-club'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DesignSystem>
        <Routes basename='/'>
          <Route path='/' element={<App />}>
            <Route path='book-club/*' element={<BookClub />} />
            <Route path='resume' element={<Resume />} />
            <Route path='contact' element={<Contact />} />
            <Route path='/' element={<Blog />} />
            <Route path='posts'>
              <Route path='/' element={<Blog />} />
              <Route path=':category'>
                <Route path='/' element={<Category />} />
                <Route path=':slug' element={<Blog />} />
              </Route>
              <Route path='tagged'>
                <Route path=':tag' element={<Tagged />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </DesignSystem>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
