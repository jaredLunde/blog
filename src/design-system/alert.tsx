import React from 'react'
import clsx from 'clsx'
import forwardRefAs from 'forward-ref-as'
import type {AsProp} from 'forward-ref-as'
import {styles} from './styles'

/**
 *
 */
export const Alert = forwardRefAs<AlertProps, 'div'>(
  ({as: As = 'div', variant = 'info', className, children, ...props}, ref) => (
    <As ref={ref} className={clsx(className, alert(variant))} {...props}>
      {children}
      <span className={alert.accent(variant)} />
    </As>
  )
)

export interface AlertProps {
  /**
   * Renders the alert "as" this component
   * @default "div"
   */
  as?: AsProp
  /**
   * Select a alert variant
   * @default "info"
   */
  variant?: keyof typeof alert.styles
  /**
   * Adds one or several class names to your component
   */
  className?: string | string[]
}

export const alert = Object.assign(
  styles({
    default: ({pad, radius, font}) => ({
      display: 'block',
      alignItems: 'center',
      padding: pad.sm,
      lineHeight: font.leading.snug,
      borderRadius: radius.primary,
      border: `2px solid currentColor`,
      width: '100%',
    }),

    light: ({color}) => ({
      color: color.indigo700,
      borderColor: color.indigo700,
    }),

    dark: ({color}) => ({
      color: color.white,
      borderColor: color.white,
      backgroundColor: color.indigo900,
    }),

    info: ({color}) => ({
      color: color.blue900,
      borderColor: color.blue900,
    }),

    success: ({color}) => ({
      color: color.teal900,
      borderColor: color.teal900,
    }),

    danger: ({color}) => ({
      color: color.red900,
      borderColor: color.red900,
    }),

    warning: ({color}) => ({
      color: color.orange900,
      borderColor: color.orange900,
    }),
  }),
  {
    accent: styles({
      default: ({radius}) => ({
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: 3,
        left: 0,
        backgroundColor: 'currentColor',
        opacity: 0.1,
        borderRadius: `0 0 ${radius.primary} ${radius.primary}`,
      }),

      light: ({color}) => ({
        backgroundColor: color.blue100,
        opacity: 1,
      }),

      dark: ({color}) => ({
        backgroundColor: color.indigo700,
        opacity: 1,
      }),

      info: ({color}) => ({
        backgroundColor: color.indigo200,
        opacity: 1,
      }),

      success: ({color}) => ({
        backgroundColor: color.teal200,
        opacity: 1,
      }),

      danger: ({color}) => ({
        backgroundColor: color.red200,
        opacity: 1,
      }),

      warning: ({color}) => ({
        backgroundColor: color.orange200,
        opacity: 1,
      }),
    }),
  }
)
