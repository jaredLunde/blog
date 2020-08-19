import React from 'react'
import {Column} from '@dash-ui/react-layout'
import {Input} from '../input'
import {Button} from '../button'

export default {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    placeholder: {
      control: {
        type: 'text',
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
  },
}

const Template = (props: any = {}) => (
  <Column gap='lg' width={400}>
    <Input type='text' name='firstName' autoComplete='given-name' {...props} />
    <Input
      type='text'
      name='lastName'
      autoComplete='family-name'
      placeholder='Last name'
    />
    <Input
      type='email'
      name='emailAddress'
      autoComplete='email'
      placeholder='Email address'
    />
    <Input
      type='password'
      name='password'
      autoComplete='new-password'
      placeholder='Password'
    />
    <div>
      <Button>Submit</Button>
    </div>
  </Column>
)

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  placeholder: 'First name',
}
