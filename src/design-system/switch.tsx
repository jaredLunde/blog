import React from 'react'
import {Checkbox, Toggle} from '@accessible/checkbox'
import type {CheckboxProps} from '@accessible/checkbox'
import {styles} from './styles'
import {mq} from './mq'

/**
 * An accessible switch component that uses a native `<input type='checkbox'>`
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const [checked, setChecked] = React.useState(
      props.checked ?? props.defaultChecked ?? false
    )
    const [focused, setFocused] = React.useState(false)

    return (
      <Checkbox
        {...props}
        onFocus={(e) => {
          props.onFocus?.(e)
          setFocused(true)
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
          setFocused(false)
        }}
        onChange={(checked) => {
          props.onChange?.(checked)
          setChecked(checked)
        }}
        ref={ref}
      >
        <Toggle>
          <span
            className={toggleSwitch({
              on: checked,
              off: !checked,
              focused,
              disabled: props.disabled,
            })}
          >
            <span
              className={toggleSwitch.thumb({
                on: checked,
                off: !checked,
                disabled: props.disabled,
              })}
            />
          </span>
        </Toggle>
      </Checkbox>
    )
  }
)

export interface SwitchProps extends CheckboxProps {}

export const toggleSwitch = Object.assign(
  styles({
    default: ({color, hairline, radius, transition}) => ({
      display: 'inline-flex',
      alignItems: 'center',
      border: `${hairline} solid ${color.translucent}`,
      borderRadius: radius.full,
      transition: `background-color ${transition.duration.normal} ${transition.timing.inOut}`,
      height: '1.08em',
      width: '2.08em',
    }),

    off: mq({
      default: ({color}) => ({
        backgroundColor: color.indigo100,
      }),
      hover: ({color}) => ({
        '&:hover': {
          backgroundColor: color.gray300,
        },
        '[disabled] ~ &:hover': {
          backgroundColor: color.gray200,
        },
      }),
    }),

    on: mq({
      default: ({color}) => ({
        backgroundColor: color.teal500,
      }),
      hover: ({color}) => ({
        '&:hover': {
          backgroundColor: color.teal400,
        },
        '[disabled] ~ &:hover': {
          backgroundColor: color.teal500,
        },
      }),
    }),

    focused: ({elevation}) => ({
      boxShadow: elevation.outline,
    }),

    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  }),
  {
    thumb: styles({
      default: ({color, transition, radius, elevation}) => ({
        display: 'inline-block',
        transition: `transform ${transition.duration.fast} ${transition.timing.inOut}`,
        width: `calc(1.08em - 3px)`,
        height: 'calc(100% - 2px)',
        borderRadius: radius.full,
        backgroundColor: color.white,
        boxShadow: elevation.md,
        pointerEvents: 'none',
      }),

      off: {
        transform: 'translateX(1px)',
      },

      on: {
        transform: `translateX(${2.08 - 1.08}em)`,
      },

      disabled: ({elevation}) => ({
        boxShadow: elevation.xs,
      }),
    }),
  }
)
