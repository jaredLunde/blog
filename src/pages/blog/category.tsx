import React from 'react'
import {Helmet} from 'react-helmet-async'
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
  const formattedTitle =
    posts[0].metadata.categories.find((c) => slugify(c) === slug) || category

  return (
    <MDXProvider components={components}>
      <Column gap='lg'>
        <Helmet>
          <title>{formattedTitle} articles by Jared Lunde</title>
          <meta
            name='description'
            content={`Dive in to my "${formattedTitle}" articles. Follow me at @jaredLunde on Twitter for my less nuanced musings.`}
          />
          <link
            rel='canonical'
            href={`https://jaredlunde.com/posts/${slugify(formattedTitle)}`}
          />
        </Helmet>

        <h1>{formattedTitle}</h1>

        <Divider />

        <Box pad={['md', 'none', 'none']}>
          <ListPosts posts={orderedPosts} />
        </Box>
      </Column>
    </MDXProvider>
  )
}

export default Category
