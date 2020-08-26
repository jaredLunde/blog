import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {useParams} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
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
  const formattedTitle =
    posts[0].metadata.tags.find((c) => slugify(c) === slug) || tag

  return (
    <MDXProvider components={components}>
      <Helmet>
        <title>
          Posts tagged &ldquo;{formattedTitle}&rdquo; by Jared Lunde
        </title>
        <meta
          name='description'
          content={`Dive in to my "${formattedTitle}" articles. Follow me at @jaredLunde on Twitter for my less nuanced musings.`}
        />
        <link
          rel='canonical'
          href={`https://jaredlunde.com/posts/tagged/${slugify(
            formattedTitle
          )}`}
        />
      </Helmet>

      <Column gap='lg'>
        <h1>{formattedTitle}</h1>

        <Divider />

        <Box pad={['md', 'none', 'none']}>
          <ListPosts posts={orderedPosts} />
        </Box>
      </Column>
    </MDXProvider>
  )
}

export default Tagged
