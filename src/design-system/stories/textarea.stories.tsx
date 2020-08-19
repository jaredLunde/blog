import React from 'react'
import {Column} from '@dash-ui/react-layout'
import {Button} from '../button'
import {Textarea} from '../textarea'

export default {
  title: 'Forms/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: {
      control: {
        type: 'text',
      },
    },
    autoResize: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
    },
    rows: {
      control: {
        type: 'number',
      },
    },
  },
}

const Template = (props: any = {}) => (
  <Column gap='lg' width={400}>
    <Textarea name='comment' {...props} />
    <div>
      <Button>Submit</Button>
    </div>
  </Column>
)

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  placeholder: 'Leave a comment',
  rows: 3,
  autoResize: true,
}
