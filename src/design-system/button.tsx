import React from 'react'
import {useA11yButton} from '@accessible/button'
import {Row} from '@dash-ui/react-layout'
import type {RowProps} from '@dash-ui/react-layout'
import useMergedRef from '@react-hook/merged-ref'
import forwardRefAs from 'forward-ref-as'
import type {AsProp} from 'forward-ref-as'
import clsx from 'clsx'
import {responsiveStyles} from './styles'
import type {ResponsiveProp} from './styles'
import {mq} from './mq'

/**
 * An accessible component for creating button styles from variants and
 * design tokens. This is a `<button>` by default, but this can
 * be overriden with the `as` prop. Regardless of the node type, this
 * button will be accessible to screen readers.
 */
export const Button = forwardRefAs<ButtonProps, 'button'>(
  ({variant = 'primary', className, onClick, ...props}, ref) => {
    const a11yRef = React.useRef<HTMLButtonElement>(null)
    const a11yProps = useA11yButton(a11yRef, onClick)

    return (
      <Row
        ref={useMergedRef(ref, a11yRef)}
        className={clsx(className, button(variant))}
        as='button'
        {...a11yProps}
        {...props}
      />
    )
  }
)

export interface ButtonProps extends RowProps {
  /**
   * Renders the button "as" this component
   * @default "button"
   */
  as?: AsProp
  /**
   * Select a button variant
   * @default "primary"
   */
  variant?: ResponsiveProp<keyof typeof button.styles>
  /**
   * Adds one or several class names to your component
   */
  className?: string | string[]
  onClick(event: MouseEvent): any
}

/**
 * An accessible component for creating button styles from variants and
 * design tokens. This is a `<button>` by default, but this can
 * be overriden with the `as` prop. Regardless of the node type, this
 * button will be accessible to screen readers.
 */
export const OutlineButton = forwardRefAs<OutlineButtonProps, 'button'>(
  ({variant = 'primary', className, onClick, ...props}, ref) => {
    const a11yRef = React.useRef<HTMLButtonElement>(null)
    const a11yProps = useA11yButton(a11yRef, onClick)

    return (
      <Row
        ref={useMergedRef(ref, a11yRef)}
        className={clsx(className, outlineButton(variant))}
        as='button'
        {...a11yProps}
        {...props}
      />
    )
  }
)

export interface OutlineButtonProps extends Omit<ButtonProps, 'variant'> {
  /**
   * Renders your component "as" this component
   * @default "button"
   */
  as?: AsProp
  /**
   * Select a button variant
   * @default "primary"
   */
  variant?: ResponsiveProp<keyof typeof outlineButton.styles>
  /**
   * Adds one or several class names to your component
   */
  className?: string | string[]
  onClick(event: MouseEvent): any
}

/**
 * Resets all vendor `<button>` styles
 */
export const resetVendorButtonStyles = {
  padding: 0,
  border: 'none',
  font: 'inherit',
  color: 'inherit',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  appearance: 'none',
  userSelect: 'none',
  cursor: 'pointer',
  verticalAlign: 'middle',
  MozFocusInner: {
    border: 0,
    padding: 0,
    margin: 0,
  },
  '*': {
    pointerEvents: 'none',
  },
} as const

/**
 * These are variants for solid button styles you want to use most often
 * in your application.
 */
export const button = responsiveStyles({
  /**
   * The default variant adds shared styles to the button
   */
  default: ({font, elevation, transition, radius, color, hairline}) => ({
    ...resetVendorButtonStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: font.leading.none,
    userSelect: 'none',
    fontSize: font.size.sm,
    fontWeight: 500,
    letterSpacing: font.tracking.wide,
    padding: `${10 / 16}rem ${32 / 16}rem`,
    borderRadius: radius.primary,
    // The border here ensures we get the same size/positioning as
    // the outline button
    border: `${hairline} solid transparent`,
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: transition.duration.fast,
    transitionTimingFunction: transition.timing.inOut,

    '&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: color.gray300,
      color: color.gray600,
    },

    '.using-keyboard &:focus': {
      boxShadow: elevation.outline,
    },
  }),

  primary: mq({
    default: ({color}) => ({
      backgroundColor: color.primary,
      color: color.white,
    }),
    hover: ({color, elevation}) => ({
      '&:hover:not([disabled])': {
        backgroundColor: color.blue800,
      },
      '&:active:not([disabled])': {
        backgroundColor: color.blue900,
        boxShadow: elevation.xs,
      },
    }),
  }),

  secondary: mq({
    default: ({color}) => ({
      backgroundColor: color.gray700,
      color: color.gray100,
    }),
    hover: ({color}) => ({
      '&:hover:not([disabled])': {
        backgroundColor: color.gray800,
      },
      '&:active:not([disabled])': {
        backgroundColor: color.gray900,
      },
    }),
  }),
})

/**
 * These are variants for outline button styles you want to use most often
 * in your application.
 */
export const outlineButton = responsiveStyles({
  /**
   * The default variant adds shared styles to the button
   */
  default: ({font, elevation, transition, radius, color, hairline}) => ({
    ...resetVendorButtonStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: font.leading.none,
    userSelect: 'none',
    fontWeight: 500,
    fontSize: font.size.sm,
    letterSpacing: font.tracking.wide,
    padding: `${10 / 16}rem ${32 / 16}rem`,
    borderRadius: radius.primary,
    borderWidth: hairline,
    borderStyle: 'solid',
    transitionProperty: 'background-color',
    transitionDuration: transition.duration.fast,
    transitionTimingFunction: transition.timing.inOut,
    '&[disabled]': {
      cursor: 'not-allowed',
      borderColor: color.gray300,
      color: color.gray500,
    },
    '.using-keyboard &:focus': {
      boxShadow: elevation.outline,
    },
  }),

  primary: mq({
    default: ({color}) => ({
      borderColor: color.indigo400,
      color: color.indigo800,
    }),
    hover: ({color}) => ({
      '&:hover:not([disabled])': {
        borderColor: color.indigo600,
      },
      '&:active:not([disabled])': {
        color: color.indigo900,
        borderColor: color.indigo900,
      },
    }),
  }),

  secondary: mq({
    default: ({color}) => ({
      borderColor: color.gray400,
      color: color.gray800,
    }),
    hover: ({color}) => ({
      '&:hover:not([disabled])': {
        borderColor: color.gray600,
      },
      '&:active:not([disabled])': {
        color: color.primary,
        borderColor: color.primary,
      },
    }),
  }),
})
