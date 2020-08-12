import React from 'react'
import {Box} from '@dash-ui/react-layout'
import type {BoxProps} from '@dash-ui/react-layout'
import type {DashTokens, StyleMap} from '@dash-ui/styles'
import forwardRefAs from 'forward-ref-as'
import clsx from 'clsx'
import {styles, responsiveStyles} from './styles'
import type {ResponsiveProp} from './styles'
import {tokens} from './tokens'

/**
 * A component for creating text styles from variants and
 * design tokens. This is a `<span>` by default, but this can
 * be overriden with the `as` prop.
 */
export const Text = forwardRefAs<TextProps, 'span'>(
  (
    {variant, family, size, leading, tracking, color, className, ...props},
    ref
  ) => {
    return (
      <Box
        ref={ref}
        className={clsx(
          className,
          styles.join(
            text.css(variant),
            text.family.css(family),
            text.size.css(size),
            text.leading.css(leading),
            text.tracking.css(tracking),
            text.color.css(color)
          )
        )}
        as='span'
        {...props}
      />
    )
  }
)

export interface TextProps extends Omit<BoxProps, 'size'> {
  /**
   * Select a text variant
   * @default "default"
   */
  variant?: ResponsiveProp<keyof typeof text.styles>
  /**
   * Set a font family on the component
   */
  family?: ResponsiveProp<keyof DashTokens['font']['family']>
  /**
   * Set a font size on the component
   */
  size?: ResponsiveProp<keyof DashTokens['font']['size']>
  /**
   * Set `line-height` on the component
   */
  leading?: ResponsiveProp<keyof DashTokens['font']['leading']>
  /**
   * Set `letter-spacing` on the component
   */
  tracking?: ResponsiveProp<keyof DashTokens['font']['tracking']>
  /**
   * Set a font color on the component
   */
  color?: ResponsiveProp<keyof DashTokens['color']>
}

/**
 * A class name generator for your text variants
 */
export const text = Object.assign(
  responsiveStyles({
    /**
     * These are variants for text styles you want to use most often
     * in your application.
     */
    default: {},
    heading: ({font, color}) => ({
      fontSize: font.size['4xl'],
      fontWeight: '700',
      lineHeight: font.leading.tight,
      letterSpacing: font.tracking.tighter,
      color: color.gray900,
    }),
    headingSm: ({font, color}) => ({
      fontSize: font.size['2xl'],
      lineHeight: font.leading.tight,
      letterSpacing: font.tracking.tight,
      fontWeight: '500',
      color: color.gray800,
    }),
    caption: ({font, color}) => ({
      fontSize: font.size.xs,
      lineHeight: font.leading.snug,
      letterSpacing: font.tracking.normal,
      fontWeight: '300',
      color: color.gray600,
    }),
    action: ({font}) => ({
      fontSize: font.size.xs,
      lineHeight: font.leading.snug,
      letterSpacing: font.tracking.wider,
      textTransform: 'uppercase',
      textRendering: 'optimizeLegibility',
      fontWeight: '600',
    }),
  }),
  {
    /**
     * Creates `line-height` styles for all of your `font.leading`
     * design tokens.
     */
    leading: responsiveStyles(
      (Object.keys(
        tokens.font.leading
      ) as (keyof DashTokens['font']['leading'])[]).reduce<
        Partial<StyleMap<keyof DashTokens['font']['leading']>>
      >((obj, key) => {
        obj[key] = ({font}) => ({
          lineHeight: font.leading[key],
        })

        return obj
      }, {})
    ),

    /**
     * Creates `letter-spacing` styles for all of your `font.tracking`
     * design tokens.
     */
    tracking: responsiveStyles(
      (Object.keys(
        tokens.font.tracking
      ) as (keyof DashTokens['font']['tracking'])[]).reduce<
        Partial<StyleMap<keyof DashTokens['font']['tracking']>>
      >((obj, key) => {
        obj[key] = ({font}) => ({
          letterSpacing: font.tracking[key],
        })

        return obj
      }, {})
    ),

    /**
     * Creates font `color` styles for all of your `color`
     * design tokens.
     */
    color: responsiveStyles(
      (Object.keys(tokens.color) as (keyof DashTokens['color'])[]).reduce<
        Partial<StyleMap<keyof DashTokens['color']>>
      >((obj, key) => {
        obj[key] = ({color}) => ({
          color: color[key],
        })

        return obj
      }, {})
    ),

    /**
     * Creates `font-family` styles for all of your `font.family`
     * design tokens.
     */
    family: responsiveStyles(
      (Object.keys(
        tokens.font.family
      ) as (keyof DashTokens['font']['family'])[]).reduce<
        Partial<StyleMap<keyof DashTokens['font']['family']>>
      >((obj, key) => {
        obj[key] = ({font}) => ({
          fontFamily: font.family[key],
        })

        return obj
      }, {})
    ),

    /**
     * Creates `font-size` styles for all of your `font.size`
     * design tokens.
     */
    size: responsiveStyles(
      (Object.keys(
        tokens.font.size
      ) as (keyof DashTokens['font']['size'])[]).reduce<
        Partial<StyleMap<keyof DashTokens['font']['size']>>
      >((obj, key) => {
        obj[key] = ({font}) => ({
          fontSize: font.size[key],
        })

        return obj
      }, {})
    ),
  }
)
