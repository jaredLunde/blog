import React from 'react'
import {Column, Row} from '@dash-ui/react-layout'
import {Switch, Text} from '../'

export default {
  title: 'Forms/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (props: any = {}) => (
  <Column align='start' gap='lg'>
    <Text as='label'>
      <Row as='span' align='center' gap='md'>
        <Switch {...props} />
        <span>I scale with text</span>
      </Row>
    </Text>

    <Text as='label' size='lg'>
      <Row as='span' align='center' gap='md'>
        <Switch {...props} />
        <span>I scale with text</span>
      </Row>
    </Text>

    <Text as='label' size='2xl'>
      <Row as='span' align='center' gap='md'>
        <Switch {...props} height='2em' />
        <span>I scale with text</span>
      </Row>
    </Text>

    <Text as='label' size='3xl'>
      <Row as='span' align='center' gap='md'>
        <Switch {...props} height='2em' />
        <span>I scale with text</span>
      </Row>
    </Text>

    <Text as='label' size='4xl'>
      <Row as='span' align='center' gap='md'>
        <Switch {...props} height='2em' />
        <span>I scale with text</span>
      </Row>
    </Text>
  </Column>
)

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  disabled: false,
}
