import React from 'react'
import {useLocation} from 'react-router-dom'
import tabbable from '@accessible/tabbable'

let popped = false
window.addEventListener('popstate', () => {
  popped = true
})

// TODO: Need to figure out how to know when React has stopped
// suspending
export function useFocusMainContent() {
  const {pathname} = useLocation()

  React.useEffect(() => {
    if (!popped) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const tabbableEls = tabbable(document.getElementById('main-content')!)

      if (tabbableEls.length) {
        tabbableEls[0].focus({
          preventScroll: true,
        })
      }
    }

    popped = false
  }, [pathname])
}
