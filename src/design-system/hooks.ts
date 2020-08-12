import {useTokens} from '@dash-ui/react'
import {useWindowHeight} from '@react-hook/window-size'

/**
 * A hook that solves the `100vh` issue on iOS. Anywhere you want to
 * use `100vh`, just use `var(--vh)` instead.
 */
export function useVh() {
  const vh = useWindowHeight()
  useTokens(
    {
      vh: typeof window !== 'undefined' ? vh + 'px' : '100vh',
    },
    [vh]
  )
}
