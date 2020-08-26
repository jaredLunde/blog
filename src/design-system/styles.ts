import {createStyles} from '@dash-ui/styles'
import responsive from '@dash-ui/responsive'
import type {Responsive} from '@dash-ui/responsive'
import type {MediaQueries} from '@dash-ui/react-layout'
import {tokens, themes} from './tokens'
import {mediaQueries} from './mq'

/**
 * A `styles()` instance that is configured to use your design tokens
 * and themes.
 */
export const styles = createStyles({
  tokens,
  themes,
  // This will mangle (minify) token names in "production" mode only.
  mangleTokens:
    typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'
      ? false
      : // Prevents `var(--vh)` from being mangled. You can add any tokens in
        // here that are used outside of Dash.
        {vh: true},
})

/**
 * A function for adding responsive props/styles to components
 */
export const responsiveStyles = responsive(styles, mediaQueries)
export type ResponsiveProp<Variant> =
  | Variant
  | Responsive<Variant, MediaQueries>
