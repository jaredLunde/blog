import React from 'react'
import * as Accessible from '@accessible/tabs'
import forwardRefAs from 'forward-ref-as'
import type {AsProp} from 'forward-ref-as'
import {resetVendorButtonStyles} from './button'
import {styles} from './styles'
import {mq} from './mq'

export const Tabs = Accessible.Tabs
export interface TabsProps extends Accessible.TabsProps {}

export const TabList = forwardRefAs<TabListProps, 'div'>(
  ({as: As = 'div', children, ...props}, ref) => (
    <div className={tabs()} ref={ref} {...props}>
      <span className={tabs.border()} />
      <Accessible.TabList>
        <As className={tabs.list()}>{children}</As>
      </Accessible.TabList>
    </div>
  )
)

export interface TabListProps
  extends Omit<Accessible.TabListProps, 'children'> {
  as?: AsProp
}

export const Tab = forwardRefAs<TabProps, 'button'>(
  (
    {
      as: As = 'button',
      children,
      disabled,
      activeStyle,
      inactiveStyle,
      index,
      onDelete,
      ...props
    },
    ref
  ) => (
    <Accessible.Tab
      inactiveClass={tabs.tab('inactive')}
      activeClass={tabs.tab('active')}
      disabled={disabled}
      activeStyle={activeStyle}
      inactiveStyle={inactiveStyle}
      index={index}
      onDelete={onDelete}
    >
      <As ref={ref} {...props}>
        {children}
      </As>
    </Accessible.Tab>
  )
)

export interface TabProps
  extends Omit<
    Accessible.TabProps,
    'activeClass' | 'inactiveClass' | 'children'
  > {
  as?: AsProp
  index: number
  children: React.ReactNode
}

export const Panel = forwardRefAs<PanelProps, 'div'>(
  (
    {as: As = 'div', children, activeStyle, inactiveStyle, index, ...props},
    ref
  ) => (
    <Accessible.Panel
      inactiveClass={tabs.tab('inactive')}
      activeClass={tabs.tab('active')}
      activeStyle={activeStyle}
      inactiveStyle={inactiveStyle}
      index={index}
    >
      <As ref={ref} {...props}>
        {children}
      </As>
    </Accessible.Panel>
  )
)

export interface PanelProps
  extends Omit<
    Accessible.PanelProps,
    'activeClass' | 'inactiveClass' | 'children'
  > {
  as?: AsProp
  index: number
  children: React.ReactNode
}

export const useTab = Accessible.useTab
export const useTabs = Accessible.useTabs

export const tabs = Object.assign(
  styles.one({
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%',
    overflowX: 'auto',
  }),
  {
    border: styles.one(({color}) => ({
      position: 'absolute',
      top: 'auto',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: 2,
      backgroundColor: color.white,
    })),

    list: styles.one(
      mq({
        default: {
          display: 'flex',
          flexWrap: 'nowrap',
          flexShrink: 0,
          margin: '0 auto',
        },
        min: {
          padding: 0,
          width: '100%',
        },
        md: ({pad}) => ({
          padding: `0 ${pad.xl}`,
          width: '80ch',
        }),
      })
    ),

    tab: styles({
      default: ({font, pad, gap, color}) => ({
        ...resetVendorButtonStyles,
        display: 'flex',
        flexWrap: 'nowrap',
        flexShrink: 0,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${pad.sm} ${pad.lg}`,
        borderTopWidth: 2,
        borderTopStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        lineHeight: font.leading.snug,
        textRendering: 'optimizeLegibility',
        cursor: 'pointer',
        fontWeight: '600',

        '> * + *': {
          marginLeft: gap.md,
        },

        '.using-keyboard &:focus': {
          boxShadow: 'none',
          color: color.primary,
        },
      }),

      icon: mq({
        default: ({color, pad}) => ({
          flexGrow: 0,
          borderColor: 'transparent',
          borderBottomColor: 'white',
          color: color.gray600,
          padding: `${pad.sm} ${pad.md}`,
        }),
        hover: ({color}) => ({
          ':hover': {
            color: color.gray800,
          },
        }),
      }),

      inactive: mq({
        default: ({color}) => ({
          borderColor: 'transparent',
          borderBottomColor: 'white',
          color: color.gray600,
        }),
        hover: {
          ':hover': {
            borderTopColor: 'currentColor',
          },
        },
      }),

      active: ({color}) => ({
        borderTopColor: 'currentColor',
        borderBottomColor: 'white',
        color: color.gray800,
      }),
    }),
  }
)
