import React from 'react'
import clsx from 'clsx'
import forwardRefAs from 'forward-ref-as'
import type {AsProp} from 'forward-ref-as'
import {styles} from './styles'

export const Divider = forwardRefAs<BadgeProps, 'div'>(
  ({as: As = 'div', className, ...props}, ref) => (
    <As
      ref={ref}
      className={clsx(className, divider())}
      {...props}
      aria-hidden
    />
  )
)

export interface BadgeProps {
  /**
   * Renders the badge "as" this component
   * @default "span"
   */
  as?: AsProp
  /**
   * Adds one or several class names to your component
   */
  className?: string | string[]
}

export const divider = styles.one(({color, hairline}) => ({
  width: '100%',
  height: hairline,
  backgroundColor: color.translucent,
}))
