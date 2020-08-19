import React from 'react'
import clsx from 'clsx'
import {styles} from './styles'
import {mq} from './mq'
import {resetVendorInputStyles} from './input'
import {noop} from './utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      placeholder,
      autoResize,
      style,
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
    const [resizeStyle, setResizeStyle] = React.useState<React.CSSProperties>(
      {}
    )
    const typing = (!props.readOnly && focused) || entered

    return (
      <label
        className={clsx(
          className,
          textarea({
            focused: focused && !props.readOnly,
            autoResize,
            disabled: props.disabled,
            readOnly: props.readOnly,
          })
        )}
      >
        <span
          className={textarea.visualStyles({
            focused: focused && !props.readOnly,
            typing,
            readOnly: props.readOnly,
          })}
        >
          <span />
          {placeholder && (
            <span>
              <span className={textarea.placeholder({typing})}>
                {placeholder}
              </span>
            </span>
          )}
          <span />
        </span>

        <textarea
          ref={ref}
          {...props}
          style={style ? Object.assign(style, resizeStyle) : resizeStyle}
          onChange={(e) => {
            setEntered(!!e.target.value)

            if (autoResize) {
              if (!e.target.value) {
                setResizeStyle((current) =>
                  current.height === void 0 ? current : {}
                )
              } else {
                const {target} = e

                setResizeStyle((current) => {
                  // Setting this to `auto` first ensures that we get an
                  // accurate assessment of the height when a user deletes
                  // text.
                  target.style.height = 'auto'
                  const nextHeight = target.scrollHeight
                  if (nextHeight === current.height) {
                    target.style.height = target.scrollHeight + 'px'
                    return current
                  }
                  return {
                    height: nextHeight,
                  }
                })
              }
            }

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

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  /**
   * Turning on `autoResize` will automatically resize the `<textarea>`
   * to fit its value each time the value grows large enough to cause a
   * scroll bar.
   */
  autoResize?: boolean
  placeholder?: string
  className?: string | string[]
}

export const textarea = Object.assign(
  styles({
    default: mq({
      default: ({pad, color, transition, font}) => ({
        display: 'inline-block',
        color: color.gray600,

        textarea: {
          ...resetVendorInputStyles,
          lineHeight: font.leading.normal,
          resize: 'vertical',
          color: color.gray600,
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

      textarea: {
        caretColor: color.indigo600,
        color: color.gray800,
      },
    }),

    autoResize: {
      textarea: {
        overflow: 'hidden!important',
        resize: 'none!important',
      },
    },

    disabled: mq({
      default: {
        opacity: 0.5,
        textarea: {
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
        textarea: {
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
        top: 0,
        bottom: 0,
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
            alignItems: 'flex-start',
            borderRightWidth: 0,
            borderLeftWidth: 0,
            padding: pad.sm,
          },

          ':last-child': {
            flexGrow: '1',
            borderLeftWidth: 0,
            borderRadius: `0 ${radius.primary} ${radius.primary} 0`,
          },
        },
      }),

      focused: ({elevation}) => ({
        boxShadow: elevation.md,

        '> span': {
          borderBottomWidth: 2,
        },
      }),

      readOnly: ({color}) => ({
        backgroundColor: color.translucent,
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
