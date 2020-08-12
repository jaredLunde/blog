import React from 'react'
import {Column} from '@dash-ui/react-layout'
import {Text, Button, Badge, badge} from '../'

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(badge.styles),
      },
    },
    as: {
      control: {
        type: 'select',
        options: ['span', 'div', 'a'],
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
  <Column gap='lg' align='start'>
    <Text>
      I scale with text <Badge {...props} />
    </Text>
    <Text size='lg'>
      I scale with text <Badge {...props} />
    </Text>
    <Text size='2xl'>
      I scale with text <Badge {...props} />
    </Text>
    <Text size='3xl'>
      I scale with text <Badge {...props} />
    </Text>
    <Text size='4xl'>
      I scale with text <Badge {...props} />
    </Text>
    <Button gap='md'>
      <span>Notifications</span> <Badge {...props} children='0' />
    </Button>
  </Column>
)

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  variant: Object.keys(badge.styles)[1],
  as: 'span',
  children: 'New',
}
