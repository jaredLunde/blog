import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {useParams} from 'react-router-dom'
import {Box, Column} from '@dash-ui/react-layout'
import {Divider} from '@design-system/divider'
import {useOrder, useCategory, slugify} from 'proser'
import {ListPosts} from './components/list-posts'
import * as components from './posts/components'
import {posts as basePosts} from './posts'

function Category() {
  const {category} = useParams() as {category: string}
  const {slug, posts} = useCategory(basePosts, category)
  const orderedPosts = useOrder(posts, 'desc')

  return (
    <MDXProvider components={components}>
      <Column gap='lg'>
        <h1>
          {posts[0].metadata.categories.find((c) => slugify(c) === slug) ||
            category}
        </h1>

        <Divider />

        <Box pad={['md', 'none', 'none']}>
          <ListPosts posts={orderedPosts} />
        </Box>
      </Column>
    </MDXProvider>
  )
}

export default Category
