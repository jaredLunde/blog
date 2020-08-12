import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {DesignSystem} from './design-system/design-system'
import {App} from './app'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DesignSystem>
        <App />
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
