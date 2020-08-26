import React from 'react'
import {Box} from '@dash-ui/react-layout'
import type {BoxProps} from '@dash-ui/react-layout'
import forwardRefAs from 'forward-ref-as'
import clsx from 'clsx'
import {styles, responsiveStyles} from './styles'
import {mq} from './mq'
import {typography} from './typography'
import {em} from './utils'

/**
 * A component for long form writing where you want the default
 * typography styles to have precendent and you do not want to
 * manage spacing on your own, e.g. Markdown.
 */
export const Prose = forwardRefAs<ProseProps, 'article'>(
  ({className, ...props}, ref) => {
    return (
      <Box
        ref={ref}
        className={clsx(className, prose())}
        as='article'
        {...props}
      />
    )
  }
)

export interface ProseProps extends BoxProps {}

/**
 * Responsive styles for adding spacing to prose
 */
const proseSpacing = responsiveStyles.one({
  maxWidth: '80ch',
  textAlign: 'left',
  table: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
  },
  p: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  blockquote: {
    marginTop: em(32, 20),
    marginBottom: em(32, 20),
  },
  h1: {
    marginTop: 0,
    marginBottom: em(18, 36),
  },
  h2: {
    marginTop: em(32, 24),
    marginBottom: em(18, 24),
  },
  h3: {
    marginTop: em(32, 20),
    marginBottom: em(10, 20),
  },
  h4: {
    marginTop: em(24, 16),
    marginBottom: em(8, 16),
  },
  img: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    maxWidth: '100vw',

    [mq('min')]: {
      width: '100%',
      marginLeft: 0,
    },
    [mq('md')]: {
      width: '124%',
      marginLeft: '-12%',
    },
  },
  video: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    maxWidth: '100vw',

    [mq('min')]: {
      width: '100%',
      marginLeft: 0,
    },
    [mq('md')]: {
      width: '124%',
      marginLeft: '-12%',
    },
  },
  figure: {
    marginTop: em(32, 16),
    marginBottom: em(32, 16),
    maxWidth: '100vw',

    [mq('min')]: {
      width: '100%',
      marginLeft: 0,
    },
    [mq('md')]: {
      width: '124%',
      marginLeft: '-12%',
    },
  },
  'figure > *': {
    marginTop: '0',
    marginBottom: '0',
  },
  'figure figcaption': {
    marginTop: em(12, 14),
  },
  pre: {
    marginTop: em(24, 14),
    marginBottom: em(24, 14),
    maxWidth: '100vw',

    [mq('min')]: {
      width: '100%',
      marginLeft: 0,
    },
    [mq('md')]: {
      width: '124%',
      marginLeft: '-12%',
    },
  },
  ol: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  ul: {
    marginTop: em(20, 16),
    marginBottom: em(20, 16),
  },
  li: {
    marginTop: em(8, 16),
    marginBottom: em(8, 16),
  },
  '> ul > li p': {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  '> ul > li > *:first-child': {
    marginTop: em(20, 16),
  },
  '> ul > li > *:last-child': {
    marginBottom: em(20, 16),
  },
  '> ol > li > *:first-child': {
    marginTop: em(20, 16),
  },
  '> ol > li > *:last-child': {
    marginBottom: em(20, 16),
  },
  'ul ul, ul ol, ol ul, ol ol': {
    marginTop: em(12, 16),
    marginBottom: em(12, 16),
  },
  hr: {
    marginTop: em(48, 16),
    marginBottom: em(48, 16),
  },
  'hr + *': {
    marginTop: '0',
  },
  'h1 + *': {
    marginTop: '0',
  },
  'h2 + *': {
    marginTop: '0',
  },
  'h3 + *': {
    marginTop: '0',
  },
  'h4 + *': {
    marginTop: '0',
  },
  '> :first-child': {
    marginTop: '0',
  },
  '> :last-child': {
    marginBottom: '0',
  },
})

function css() {
  return proseSpacing.css() + typography.css()
}

/**
 * A responsive style instance that creates typography and prose spacing
 * styles for the selected variant.
 */
export const prose = Object.assign(
  function prose() {
    return styles.cls(css())
  },
  {
    css,
  }
)
