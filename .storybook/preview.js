import React from 'react'
import {addDecorator} from '@storybook/react'
import {configureActions} from '@storybook/addon-actions'
import {DesignSystem} from '../src/design-system'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
}

addDecorator((storyFn) => <DesignSystem>{storyFn()}</DesignSystem>)

configureActions({
  depth: 3,
  limit: 20,
})
