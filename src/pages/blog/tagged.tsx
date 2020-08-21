import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {useParams} from 'react-router-dom'
import {Box, Column} from '@dash-ui/react-layout'
import {Divider} from '@design-system/divider'
import {useOrder, useTag, slugify} from 'proser'
import {ListPosts} from './components/list-posts'
import * as components from './posts/components'
import {posts as basePosts} from './posts'

function Tagged() {
  const {tag} = useParams() as {tag: string}
  const {slug, posts} = useTag(basePosts, tag)
  const orderedPosts = useOrder(posts, 'desc')

  return (
    <MDXProvider components={components}>
      <Column gap='lg'>
        <h1>
          {posts[0].metadata.tags.find((c) => slugify(c) === slug) || tag}
        </h1>

        <Divider />

        <Box pad={['md', 'none', 'none']}>
          <ListPosts posts={orderedPosts} />
        </Box>
      </Column>
    </MDXProvider>
  )
}

export default Tagged
