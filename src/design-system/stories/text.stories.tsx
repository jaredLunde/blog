import React from 'react'
import {Text, text} from '../text'
import {tokens} from '../tokens'

export default {
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    as: {
      control: {
        type: 'select',
        options: ['span', 'p', 'div', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: Object.keys(text.styles),
      },
    },
    size: {
      control: {
        type: 'select',
        options: Object.keys(tokens.font.size),
      },
    },
    leading: {
      control: {
        type: 'select',
        options: Object.keys(tokens.font.leading),
      },
    },
    tracking: {
      control: {
        type: 'select',
        options: Object.keys(tokens.font.tracking),
      },
    },
    family: {
      control: {
        type: 'select',
        options: Object.keys(tokens.font.family),
      },
    },
    color: {
      control: {
        type: 'select',
        options: Object.keys(tokens.color),
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (props: any = {}) => <Text {...props} />

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  as: 'span',
  variant: Object.keys(text.styles)[0],
  size: undefined,
  leading: undefined,
  tracking: undefined,
  family: Object.keys(tokens.font.family)[0],
  children: 'By Jove, my quick study of lexicography won a prize',
}
