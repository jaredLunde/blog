import React from 'react'
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
      {post ? <Post post={post} posts={posts} /> : <ListPosts posts={posts} />}
    </MDXProvider>
  )
}

export default Blog
