import React from 'react'
import {useLocation} from 'react-router-dom'

let popped = false
window.addEventListener('popstate', () => {
  popped = true
})

export function useScrollToTop() {
  const {pathname} = useLocation()

  React.useEffect(() => {
    if (!popped) {
      window.scrollTo({top: 0})
    }

    popped = false
  }, [pathname])
}
