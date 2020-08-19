import React from 'react'
import clsx from 'clsx'
import forwardRefAs from 'forward-ref-as'
import type {AsProp} from 'forward-ref-as'
import {styles} from './styles'

/**
 *
 */
export const Badge = forwardRefAs<BadgeProps, 'span'>(
  ({as: As = 'span', variant = 'info', className, ...props}, ref) => (
    <As ref={ref} className={clsx(className, badge(variant))} {...props} />
  )
)

export interface BadgeProps {
  /**
   * Renders the badge "as" this component
   * @default "span"
   */
  as?: AsProp
  /**
   * Select a badge variant
   * @default "info"
   */
  variant?: keyof typeof badge.styles
  /**
   * Adds one or several class names to your component
   */
  className?: string | string[]
}

export const badge = styles({
  default: ({font, color}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 10 / 14 + 'em',
    fontWeight: '600',
    letterSpacing: font.tracking.wide,
    lineHeight: font.leading.none,
    padding: `0.31em 0.5em`,
    top: '-0.1em',
    textDecoration: 'none',
    borderRadius: '0.25em',
    verticalAlign: 'text-bottom',
    backgroundColor: color.gray200,
  }),

  light: ({color}) => ({
    color: color.indigo700,
    backgroundColor: color.indigo200,
  }),

  dark: ({color}) => ({
    color: color.white,
    backgroundColor: color.indigo800,
  }),

  info: ({color}) => ({
    color: color.blue900,
    backgroundColor: color.indigo200,
  }),

  success: ({color}) => ({
    color: color.teal900,
    backgroundColor: color.teal200,
  }),

  danger: ({color}) => ({
    color: color.red900,
    backgroundColor: color.red200,
  }),

  warning: ({color}) => ({
    color: color.orange900,
    backgroundColor: color.orange200,
  }),
})
