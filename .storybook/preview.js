import React from 'react'
import {addDecorator} from '@storybook/react'
import {configureActions} from '@storybook/addon-actions'
import {BrowserRouter} from 'react-router-dom'
import {DesignSystem} from '../src/design-system/design-system'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
}

addDecorator((storyFn) => (
  <BrowserRouter>
    <DesignSystem>{storyFn()}</DesignSystem>
  </BrowserRouter>
))

configureActions({
  depth: 3,
  limit: 20,
})
