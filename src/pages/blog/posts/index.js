/**
 * ⚠️ DO NOT EDIT
 * -------------
 * This file was autogenerated by Proser.
 * Edits may be overwritten.
 */
import React from 'react'
/*__PROSER_HOISTED_STRINGS__*/ const _proserRef0 = 'How-to',
  _proserRef1 = 'Snowpack',
  _proserRef2 = 'Webpack',
  _proserRef3 = 'Frontend',
  _proserRef4 = '2 min read'

const {lazy} = React

export const postsMap = {
  'write-your-first-babel-plugin': {
    id: 0,
    slug: 'write-your-first-babel-plugin',

    component: lazy(() => import('./0-write-your-first-babel-plugin.mdx')),
    metadata: {
      title: 'So you want to write a Babel plugin',
      description:
        'Here are the Babel plugin basics and resources you need to get started.',
      timestamp: 1598459311282,
      tags: ['Babel', 'Node'],
      categories: [_proserRef0],
      readingTime: {text: '5 min read', time: 280200, words: 934},
    },
  },

  'drop-your-bundler-in-2020': {
    id: 1,
    slug: 'drop-your-bundler-in-2020',

    component: lazy(() => import('./1-drop-your-bundler-in-2020.mdx')),
    metadata: {
      title: 'Drop your bundler in 2020',
      description:
        "Snowpack and ES modules are the future of the web. If you don't need to support legacy browsers, why not drop your bundler?",
      timestamp: 1598476509136,
      tags: [_proserRef1, _proserRef2, 'Rollup', 'Parcel', 'ES modules'],
      categories: ['Hot takes', _proserRef3],
      readingTime: {text: _proserRef4, time: 103800, words: 346},
    },
  },

  'set-up-storybook-in-a-snowpack-project': {
    id: 2,
    slug: 'set-up-storybook-in-a-snowpack-project',

    component: lazy(() =>
      import('./2-set-up-storybook-in-a-snowpack-project.mdx')
    ),
    metadata: {
      title: 'Set up Storybook in a Snowpack project ',
      description:
        'How to fix common issues when adding Storybook to a Snowpack app.',
      timestamp: 1598485593466,
      tags: [_proserRef1, _proserRef2, 'Storybook'],
      categories: [_proserRef0, _proserRef3],
      readingTime: {text: _proserRef4, time: 77700, words: 259},
    },
  },
}

export const posts = Object.values(postsMap)
export const postsMapById = posts.reduce((acc, post) => {
  acc[post.id] = post
  return acc
}, {})
