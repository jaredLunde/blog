import React from 'react'
import {OutlineButton, outlineButton} from '../button'

export default {
  title: 'Components/OutlineButton',
  component: OutlineButton,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(outlineButton.styles),
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    as: {
      control: {
        type: 'select',
        options: ['button', 'div', 'a', 'span'],
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (props: any = {}) => <OutlineButton {...props} />

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  variant: 'primary',
  as: 'button',
  disabled: false,
  children: 'Click me',
}
