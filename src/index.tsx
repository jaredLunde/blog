import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {DesignSystem} from './design-system/design-system'
import {App} from './app'
import * as pages from './pages'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DesignSystem>
        <Routes basename='/'>
          <Route path='/' element={<App />}>
            <Route path='book-club/*' element={<pages.BookClub />} />
            <Route path='resume' element={<pages.Resume />} />
            <Route path='contact' element={<pages.Contact />} />
            <Route path='/' element={<pages.Blog />} />
            <Route path='posts'>
              <Route path='/' element={<pages.Blog />} />
              <Route path=':category'>
                <Route path='/' element={<pages.Category />} />
                <Route path=':slug' element={<pages.Blog />} />
              </Route>
              <Route path='tagged'>
                <Route path=':tag' element={<pages.Tagged />} />
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
