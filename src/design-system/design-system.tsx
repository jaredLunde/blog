import React from 'react'
import reset from '@dash-ui/reset'
import {LayoutProvider} from '@dash-ui/react-layout'
import {DashProvider, useGlobal} from '@dash-ui/react'
import type {Styles} from '@dash-ui/styles'
import {BodyUsingKeyboard} from '@accessible/using-keyboard'
import {styles} from './styles'
import {mediaQueries} from './mq'
import {useTypographyGlobal} from './typography'
import {useVh} from './hooks'

/**
 * This component is the context provider for your design system. It
 * provides the rest of your components access to your `styles()`
 * instance and media queries.
 */
export function DesignSystem({
  styles: systemStyles = styles,
  children,
}: DesignSystemProps) {
  return (
    <DashProvider styles={systemStyles}>
      <LayoutProvider styles={systemStyles} mediaQueries={mediaQueries}>
        <DesignSystemGlobals />
        {children}
      </LayoutProvider>
    </DashProvider>
  )
}

export interface DesignSystemProps {
  /**
   * A `styles()` instance
   */
  styles?: Styles
  children: React.ReactNode
}

/**
 * A component that adds your global styles to the app.
 */
export function DesignSystemGlobals() {
  useGlobal(reset, [])
  useGlobal(
    ({color, elevation}) => ({
      '*': {
        position: 'relative',
      },
      '*:focus': {
        outline: 'none',
      },
      body: {
        backgroundColor: color.contentBgColor,
      },
      'body.using-keyboard *:focus,body.using-keyboard .focused': {
        boxShadow: elevation.outline,
      },
      '::selection, ::-moz-selection': {
        backgroundColor: color.indigo200,
      },
    }),
    []
  )
  useTypographyGlobal()
  useVh()

  return <BodyUsingKeyboard />
}
