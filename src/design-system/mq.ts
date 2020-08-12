import dashMq from '@dash-ui/mq'
import type {DashTokens} from '@dash-ui/styles'

/**
 * These are the media queries you're using throughout your app.
 * These media queries will be available in media query props and
 * through the `mq()` helper below.
 */
export const mediaQueries = {
  min: 'only screen and (min-width: 0)',
  // 560px
  sm: 'only screen and (min-width: 35em)',
  // 768px
  md: 'only screen and (min-width: 48em)',
  // 1024px
  lg: 'only screen and (min-width: 64em)',
  // 1280px
  xl: 'only screen and (min-width: 80em)',
  // High DPI devices
  retina: [
    `(-webkit-min-device-pixel-ratio: 2)`,
    `(min-resolution: 192dpi)`,
  ].join(', '),
  // Hover-enabled devices
  hover: '(hover: hover)',
} as const

type AppMediaQueries = typeof mediaQueries

/**
 * A helper for adding media queries to Dash `styles`, `styles.one`,
 * `styles.cls`, etc. without having to type `@media blah blah` every
 * time.
 *
 * See: https://github.com/dash-ui/mq
 */
export const mq = dashMq<DashTokens, keyof AppMediaQueries>(mediaQueries)

declare module '@dash-ui/react-layout' {
  export interface MediaQueries extends AppMediaQueries {}
}
