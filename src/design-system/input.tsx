import React from 'react'
import clsx from 'clsx'
import {styles} from './styles'
import {mq} from './mq'
import {noop} from './utils'

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      placeholder,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false)
    const [entered, setEntered] = React.useState(
      !!(props.value ?? props.defaultValue)
    )
    const typing = (!props.readOnly && focused) || entered

    return (
      <label
        className={clsx(
          className,
          input({
            focused: focused && !props.readOnly,
            disabled: props.disabled,
            readOnly: props.readOnly,
          })
        )}
      >
        <span
          className={input.visualStyles({
            focused: focused && !props.readOnly,
            typing,
            readOnly: props.readOnly,
          })}
        >
          <span />
          {placeholder && (
            <span>
              <span className={input.placeholder({typing})}>{placeholder}</span>
            </span>
          )}
          <span />
        </span>

        <input
          ref={ref}
          {...props}
          onChange={(e) => {
            setEntered(!!e.target.value)
            onChange(e)
          }}
          onFocus={(e) => {
            setFocused(true)
            onFocus(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur(e)
          }}
        />
      </label>
    )
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  className?: string | string[]
}

export const resetVendorInputStyles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  margin: 0,
  padding: 0,
  lineHeight: 1,
  border: 'none',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  appearance: 'none',
  outline: 'none',
  color: 'currentColor',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: 'inherit',

  ':focus, .using-keyboard &:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
} as const

export const input = Object.assign(
  styles({
    default: mq({
      default: ({pad, color, transition, font}) => ({
        display: 'inline-block',
        color: color.gray600,

        input: {
          ...resetVendorInputStyles,
          color: color.gray600,
          lineHeight: font.leading.relaxed,
          padding: `${pad.sm} ${pad.md}`,
          width: '100%',
          transitionProperty: 'color',
          transitionDuration: transition.duration.fast,
          transitionTimingFunction: transition.timing.inOut,
        },
      }),
      hover: ({color}) => ({
        ':hover': {
          backgroundColor: color.translucent,
        },
      }),
    }),

    focused: ({color}) => ({
      color: color.indigo600,

      input: {
        caretColor: color.indigo600,
        color: color.gray800,
      },
    }),

    disabled: mq({
      default: {
        opacity: 0.5,
        input: {
          cursor: 'not-allowed',
        },
      },
      hover: {
        ':hover': {
          backgroundColor: 'transparent',
        },
      },
    }),

    readOnly: mq({
      default: {
        input: {
          cursor: 'default',
        },
      },
      hover: {
        ':hover': {
          backgroundColor: 'transparent',
        },
      },
    }),
  }),
  {
    visualStyles: styles({
      default: ({pad, radius, transition, hairline}) => ({
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        height: '100%',
        width: '100%',
        color: 'currentColor',
        borderRadius: radius.primary,
        transitionProperty: 'box-shadow',
        transitionDuration: transition.duration.fast,
        transitionTimingFunction: transition.timing.inOut,

        '> span': {
          flexShrink: 0,
          height: '100%',
          border: `${hairline} solid currentColor`,
          transitionProperty: 'border-color, border-width',
          transitionDuration: transition.duration.fast,
          transitionTimingFunction: transition.timing.inOut,

          ':first-child': {
            width: pad.sm,
            borderRightWidth: 0,
            borderRadius: `${radius.primary} 0 0 ${radius.primary}`,
          },

          ':nth-child(2):not(:last-child)': {
            display: 'flex',
            width: 'max-content',
            alignItems: 'center',
            borderRightWidth: 0,
            borderLeftWidth: 0,
            padding: `0 ${pad.sm}`,
          },

          ':last-child': {
            flexGrow: 1,
            borderLeftWidth: 0,
            borderRadius: `0 ${radius.primary} ${radius.primary} 0`,
          },
        },
      }),

      readOnly: ({color}) => ({
        backgroundColor: color.translucent,
      }),

      focused: ({elevation}) => ({
        boxShadow: elevation.md,

        '> span': {
          borderBottomWidth: 2,
        },
      }),

      typing: {
        span: {
          ':nth-child(2):not(:last-child)': {
            borderTopColor: 'transparent',
          },
        },
      },
    }),

    placeholder: styles({
      default: ({transition}) => ({
        display: 'inline-block',
        color: 'currentColor',
        transformOrigin: 'top left',
        transitionProperty: 'font-size, color, transform, font-weight',
        transitionDuration: transition.duration.fast,
        transitionTimingFunction: transition.timing.inOut,
      }),

      typing: ({font}) => ({
        fontWeight: 500,
        fontSize: font.size.xs,
        transform: `translateY(-1.618em)`,
      }),
    }),
  } as const
)
