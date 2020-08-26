import React from 'react'
import {Helmet} from 'react-helmet-async'
import {MDXProvider} from '@mdx-js/react'
import {useParams} from 'react-router-dom'
import * as components from './posts/components'
import {ListPosts} from './components/list-posts'
import {Post} from './components/post'
import {postsMap, posts} from './posts'

function Blog() {
  const {slug} = useParams() as {slug?: string}
  const post = slug && postsMap[slug]

  return (
    <MDXProvider components={components}>
      {!post && (
        <Helmet>
          <title>Jared Lunde / UI Engineer / Denver, CO</title>
          <meta
            name='description'
            content={`👋 I'm a UI engineer &amp; creative living in Denver, Colorado. Follow my blog to see what I am thinking about right now.`}
          />
          <link rel='canonical' href={`https://jaredlunde.com/resume`} />
        </Helmet>
      )}

      {post ? <Post post={post} posts={posts} /> : <ListPosts posts={posts} />}
    </MDXProvider>
  )
}

export default Blog
