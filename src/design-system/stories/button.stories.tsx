import React from 'react'
import {Button, button} from '../'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(button.styles),
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

const Template = (props: any = {}) => <Button {...props} />

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  variant: 'primary',
  as: 'button',
  disabled: false,
  children: 'Click me',
}
