import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'

export function useScrollToTop() {
  const location = useLocation()
  const {action} = useHistory()

  React.useEffect(() => {
    if (action === 'PUSH') {
      window.scrollTo(0, 0)
    }
  }, [action, location.pathname])
}
