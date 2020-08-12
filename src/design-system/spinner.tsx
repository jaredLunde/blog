import React from 'react'
import forwardRefAs from 'forward-ref-as'
import type {AsProp} from 'forward-ref-as'
import clsx from 'clsx'
import type {DashTokens} from '@dash-ui/styles'
import {styles, responsiveStyles} from './styles'
import type {ResponsiveProp} from './styles'
import {text} from './text'

/**
 * A loading spinner component with color and size options.
 */
export const Spinner = forwardRefAs<SpinnerProps, 'span'>(
  ({as: As = 'span', className, size = '1em', color, ...props}, ref) => {
    return (
      <As
        className={clsx(
          className,
          styles.join(
            spinner.css(),
            spinner.size.css(size),
            spinner.color.css(color)
          )
        )}
        ref={ref}
        {...props}
      >
        <span />
        <span />
        <span />
        <span />
      </As>
    )
  }
)

const spinnerAnimation = styles.keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const spinner = Object.assign(
  styles.one({
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    width: '1em',
    height: '1em',

    span: {
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      width: '1em',
      height: '1em',
      border: '0.125em solid #fff',
      borderRadius: '50%',
      animation: `${spinnerAnimation} 1s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
      borderColor: 'currentColor transparent transparent transparent',
    },

    'span:nth-child(1)': {
      animationDelay: '-0.375s',
    },

    'span:nth-child(2)': {
      animationDelay: '-0.25s',
    },

    'span:nth-child(3)': {
      animationDelay: '-0.125s',
    },
  }),
  {
    /**
     * A responsive style for adding color to spinners
     */
    color: text.color,
    /**
     * A responsive style for spinner sizing
     */
    size: responsiveStyles.lazy((fontSize: React.ReactText) => ({
      fontSize,
    })),
  }
)

export interface SpinnerProps {
  /**
   * Renders the component "as" this component
   * @default "span"
   */
  as?: AsProp
  /**
   * Sets the `width` and `height` of the spinner
   * @default "1em"
   */
  size?: ResponsiveProp<React.ReactText>
  /**
   * Sets the color of the spinner using design tokens. Color will
   * default to the CSS `currentColor`
   */
  color?: ResponsiveProp<keyof DashTokens['color']>
  /**
   * Adds one or several class names to your component
   */
  className?: string | string[]
}
