import {useGlobal} from '@dash-ui/react'
import {responsiveStyles} from './styles'
import {mq} from './mq'
import {rem, em, round} from './utils'

/**
 * This creates the default typography styles for your application.
 */
export const typography = responsiveStyles({
  default: mq({
    default: ({elevation, radius, font, color}) => ({
      fontFamily: font.family.sans,
      color: color.gray700,
      fontWeight: '400',

      'h1,h2,h3': {
        textRendering: 'optimizeLegibility',
        letterSpacing: font.tracking.tight,
      },
      a: {
        color: color.gray900,
        textDecorationSkipInk: 'all',
        textDecoration: 'underline',
        textDecorationThickness: '0.05em',
        textDecorationWidth: '1em',
        fontWeight: '500',

        'strong,b': {
          fontWeight: '700',
        },
      },
      '&.using-keyboard a:focus': {
        boxShadow: 'none',
        color: color.primary,
      },
      b: {
        fontWeight: '600',
      },
      strong: {
        fontWeight: '600',
      },
      ol: {
        counterReset: 'list-counter',
      },
      'ol > li': {
        position: 'relative',
        counterIncrement: 'list-counter',
      },
      'ol > li::before': {
        content: 'counter(list-counter) "."',
        position: 'absolute',
        fontWeight: '400',
        color: color.gray600,
      },
      'ul > li': {
        position: 'relative',
      },
      'ul > li::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: color.gray400,
        top: `0.67em`,
        borderRadius: '50%',
      },
      hr: {
        height: 2,
        backgroundColor: color.gray300,
        borderWidth: '0',
        borderRadius: radius.full,
      },
      blockquote: {
        fontWeight: '400',
        color: color.gray700,
        borderWidth: '0 0 0 0.125rem',
        borderLeftColor: color.gray600,
        borderStyle: 'solid',
        quotes: '"\\201C""\\201D""\\2018""\\2019"',
      },
      h1: {
        color: color.gray800,
        fontWeight: '700',
        border: 0,
      },
      h2: {
        color: color.gray800,
        fontWeight: '500',
      },
      h3: {
        color: color.gray800,
        fontWeight: '500',
      },
      h4: {
        color: color.gray800,
        fontWeight: '600',
      },
      'figure figcaption': {
        color: color.gray600,
      },
      code: {
        fontFamily: font.family.mono,
        color: color.indigo800,
        backgroundColor: color.indigo200,
        borderRadius: radius.primary,
        padding: '0.125em 0.25em',
        fontWeight: '400',
      },
      pre: {
        fontFamily: font.family.mono,
        color: color.blue900,
        backgroundColor: color.gray200,
        overflowX: 'auto',
      },
      'pre code': {
        backgroundColor: 'transparent',
        borderWidth: '0',
        borderRadius: '0',
        padding: '0',
        fontWeight: '400',
        color: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
      },
      'pre code::before': {
        content: '""',
      },
      table: {
        width: '100%',
        tableLayout: 'auto',
        textAlign: 'left',
        borderCollapse: 'collapse',
      },
      thead: {
        color: color.gray800,
        fontWeight: '700',
      },
      'thead th': {
        textTransform: 'uppercase',
        fontSize: '0.85em',
        letterSpacing: font.tracking.wide,
        verticalAlign: 'bottom',
      },
      'thead th, tbody tr td': {
        borderTop: `1px solid ${color.gray300}`,
        borderBottom: `1px solid ${color.gray300}`,
      },
      'tbody td': {
        verticalAlign: 'top',
      },
      'ol > li:before': {
        left: '0',
      },
      'thead th:first-child': {
        paddingLeft: '0',
      },
      'thead th:last-child': {
        paddingRight: '0',
      },
      'tbody td:first-child': {
        paddingLeft: '0',
      },
      'tbody td:last-child': {
        paddingRight: '0',
      },
    }),
    hover: ({color}) => ({
      a: {
        ':hover,:focus': {
          boxShadow: 'none',
          textDecorationStyle: 'wavy',
          textDecorationColor: color.primary,
        },
      },
    }),
    retina: {
      'h1,h2,h3,h4,h5,h6': {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    },
  }),
  primary: mq({
    default: {
      fontSize: rem(16),
      lineHeight: round(28 / 16),
      blockquote: {
        paddingLeft: em(20, 20),
      },
      h1: {
        fontSize: em(28, 16),
        lineHeight: round(40 / 36),
      },
      h2: {
        fontSize: em(20, 16),
        lineHeight: round(32 / 24),
      },
      h3: {
        fontSize: em(18, 16),
        lineHeight: round(32 / 20),
      },
      h4: {
        lineHeight: round(24 / 16),
      },
      'figure figcaption': {
        fontSize: em(14, 16),
        lineHeight: round(20 / 14),
      },
      code: {
        fontSize: em(14, 16),
      },
      'h2 code': {
        fontSize: em(21, 24),
      },
      'h3 code': {
        fontSize: em(18, 20),
      },
      pre: {
        fontSize: em(14, 16),
        lineHeight: round(24 / 14),
        borderRadius: rem(6),
        paddingTop: em(12, 14),
        paddingRight: em(16, 14),
        paddingBottom: em(12, 14),
        paddingLeft: em(16, 14),
      },
      'ol > li': {
        paddingLeft: em(28, 16),
      },
      'ol > li:before': {
        left: '0',
      },
      'ul > li': {
        paddingLeft: em(28, 16),
      },
      'ul > li::before': {
        width: em(6, 16),
        height: em(6, 16),
        left: em(4, 16),
      },
      table: {
        fontSize: em(14, 16),
        lineHeight: round(24 / 14),
      },
      'thead th': {
        padding: em(8, 14),
      },
      'thead th:first-child': {
        paddingLeft: '0',
      },
      'thead th:last-child': {
        paddingRight: '0',
      },
      'tbody td': {
        paddingTop: em(8, 14),
        paddingRight: em(8, 14),
        paddingBottom: em(8, 14),
        paddingLeft: em(8, 14),
      },
    },
    md: {
      h1: {
        fontSize: em(30, 16),
        lineHeight: round(40 / 36),
      },
      h2: {
        fontSize: em(22, 16),
        lineHeight: round(34 / 24),
      },
      h3: {
        fontSize: em(20, 16),
        lineHeight: round(32 / 20),
      },
    },
  }),
})

/**
 * This hook adds the typography styles to the `body` of the document.
 *
 * @param variant The typography variant you want to add to the `body`.
 *  The previous variant will be flushed from the DOM any time a new
 *  variant is selected.
 */
export function useTypographyGlobal() {
  useGlobal(
    `
      body {
        ${typography.css('primary')}
      }
    `,
    []
  )
}
