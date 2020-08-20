import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {Link, useParams} from 'react-router-dom'
import {Column, Row} from '@dash-ui/react-layout'
import {Text} from '@design-system/text'
import {Image} from '@design-system/image'
import {Divider} from '@design-system/divider'
import {styles} from '@design-system/styles'
import {useOrder, usePaginate, useCategory, slugify} from 'proser'
import * as components from './blog-posts/components'
import {posts as basePosts} from './blog-posts'
import type {Post as PostType} from './blog-posts'

function Category() {
  const {category} = useParams() as {category: string}
  const {posts} = useCategory(basePosts, category)
  const orderedPosts = useOrder(posts, 'desc')
  const [page, paginate] = usePaginate(orderedPosts)

  return (
    <MDXProvider components={components}>
      <Column gap='lg'>
        <h1>
          {posts[0].metadata.categories.find((c) => slugify(c) === category) ||
            category}
        </h1>

        <Divider />

        <Column gap='xl' pad={['md', 'none', 'none']}>
          {page.map((post, i) => (
            <React.Fragment key={post.id}>
              <BlogPostItem post={post} />
              {i < page.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Column>
      </Column>
    </MDXProvider>
  )
}

function BlogPostItem({post}: {post: PostType}) {
  return (
    <Column key={post.id} as='section' className={blogPostItem()} gap='lg'>
      {/* @ts-ignore */}
      <Row as={Text} gap='md' variant='caption'>
        <components.time>{post.metadata.timestamp}</components.time>{' '}
        <span aria-hidden>&mdash;</span>
        <Row as='span' gap='sm'>
          {post.metadata.categories.map((category) => (
            <React.Fragment key={category}>
              <Link to={`/posts/${slugify(category)}`}>{category}</Link>
            </React.Fragment>
          ))}
        </Row>
      </Row>

      <Column
        as={Link}
        to={`/posts/${slugify(post.metadata.categories[0])}/${post.slug}`}
        className={blogPostItem.link()}
        gap='lg'
      >
        <Column gap='md'>
          <h2>{post.metadata.title}</h2>
          <blockquote>{post.metadata.description}</blockquote>
          {post.metadata.image && (
            <Image
              src={post.metadata.image}
              alt={`A photo for the "${post.metadata.title}" post`}
            />
          )}
        </Column>
        <Text color='indigo700'>
          Hear me out{' '}
          <Text color='gray800'>&middot; {post.metadata.readingTime.text}</Text>
        </Text>
      </Column>
    </Column>
  )
}

const blogPostItem = Object.assign(
  styles({
    default: ({color, hairline, gap}) => ({
      '& + &': {
        borderTop: `${hairline} solid ${color.translucent}`,
      },
    }),
  }),
  {
    link: styles.one({
      textDecoration: 'none',
      '.using-keyboard &:focus': {
        textDecoration: 'underline',
      },
    }),
  }
)

export default Category
