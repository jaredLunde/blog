import React from 'react'
import {Prose, prose} from '../prose'
// @ts-ignore
import Dash from './__fixtures__/dash.mdx'

export default {
  title: 'Typography/Prose',
  component: Prose,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(prose.styles),
      },
    },
  },
}

const Template = (props: any = {}) => (
  <Prose pad={{default: 'sm', md: 'lg'}} {...props}>
    <Dash />
  </Prose>
)

export const Example = Template.bind({})
// @ts-ignore
Example.args = {
  variant: Object.keys(prose.styles)[2],
}
