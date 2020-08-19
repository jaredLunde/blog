import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {useParams} from 'react-router-dom'
import {prose} from '@design-system/prose'
import {Image} from '@design-system/image'
import {useOrder, usePaginate} from 'proser'
import {CodeBlock} from '@components/code-block'
import {posts, postsMap} from './blog-posts'

const components = {
  pre: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  code: ({className, ...props}: any) => {
    return (
      <CodeBlock language={className.replace(/language-/, '')} {...props} />
    )
  },
}

function Blog() {
  const {slug} = useParams() as {slug?: string}
  const Post = slug && postsMap[slug]?.component
  const orderedPosts = useOrder(posts, 'desc')
  const [page, paginate] = usePaginate(orderedPosts)

  return (
    <MDXProvider components={components}>
      <div className={prose()}>
        {Post ? (
          <Post />
        ) : (
          page.map((post) => {
            return React.createElement(post.component, {key: post.id})
          })
        )}
      </div>
    </MDXProvider>
  )
}

export default Blog
