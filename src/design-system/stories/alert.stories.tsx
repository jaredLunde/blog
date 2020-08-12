import React from 'react'
import {Grid} from '@dash-ui/react-layout'
import {Badge, Alert, alert} from '../'

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(alert.styles),
      },
    },
    as: {
      control: {
        type: 'select',
        options: ['div', 'p', 'span', 'a'],
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
  <Alert {...props}>
    <Grid cols={['auto', '1fr']} gap='md'>
      <Badge variant={badgeVariant[props.variant]}>New</Badge>
      <span>Your free Doritos® Locos Tacos reward awaits</span>
    </Grid>
  </Alert>
)

const badgeVariant = {
  default: 'default',
  light: 'dark',
  dark: 'light',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
}

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  variant: Object.keys(alert.styles)[1],
  as: 'div',
}
