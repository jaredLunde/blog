import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import {Link, useParams} from 'react-router-dom'
import {Column, Row, Cluster} from '@dash-ui/react-layout'
import {prose} from '@design-system/prose'
import {Text} from '@design-system/text'
import {Image} from '@design-system/image'
import {Divider} from '@design-system/divider'
import {styles} from '@design-system/styles'
import {mq} from '@design-system/mq'
import {useOrder, usePaginate, slugify} from 'proser'
import * as components from './blog-posts/components'
import {posts, postsMap} from './blog-posts'
import type {Post as PostType} from './blog-posts'

function Blog() {
  const {slug} = useParams() as {slug?: string}
  const Post = slug && postsMap[slug]
  const orderedPosts = useOrder(posts, 'desc')
  const [page, paginate] = usePaginate(orderedPosts)

  return (
    <MDXProvider components={components}>
      {Post ? (
        <Column as='article' gap='xl'>
          {/* @ts-ignore */}
          <Row as={Text} gap='md' variant='caption'>
            <components.time>{Post.metadata.timestamp}</components.time>{' '}
            <span aria-hidden>&mdash;</span>
            <Row as='span' gap='sm'>
              {Post.metadata.categories.map((category) => (
                <React.Fragment key={category}>
                  <Link to={`/posts/${slugify(category)}`}>{category}</Link>
                </React.Fragment>
              ))}
            </Row>
          </Row>

          <Column gap='md'>
            <h1>{Post.metadata.title}</h1>
            <blockquote>{Post.metadata.description}</blockquote>
          </Column>

          <Column gap='lg'>
            <div className={prose()}>
              <Post.component />
            </div>

            <div>
              <Cluster as='div' gap='sm' className={tags()}>
                {Post.metadata.tags.map((tag) => (
                  <React.Fragment key={tag}>
                    <Link to={`/posts/tagged/${slugify(tag)}`}>{tag}</Link>
                  </React.Fragment>
                ))}
              </Cluster>
            </div>
          </Column>
        </Column>
      ) : (
        <Column gap='xl'>
          {page.map((post, i) => (
            <React.Fragment key={post.id}>
              <BlogPostItem post={post} />
              {i < page.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Column>
      )}
    </MDXProvider>
  )
}

function BlogPostItem({post}: {post: PostType}) {
  console.log(post.metadata.description)
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

const tags = styles.one(
  mq({
    default: ({color, font, hairline, radius, pad}) => ({
      '> a': {
        border: `${hairline} solid ${color.gray700}`,
        color: color.gray700,
        fontWeight: 'bold',
        fontSize: 11 / 16 + 'rem',
        borderRadius: radius.primary,
        padding: `0 ${pad.sm}`,
        textDecoration: 'none',
        textTransform: 'uppercase',
      },

      '.using-keyboard &:focus > a': {
        border: `${hairline} solid ${color.primary}`,
        color: color.primary,
      },
    }),
    hover: ({color, hairline}) => ({
      '> a:hover': {
        border: `${hairline} solid ${color.white}`,
        color: color.white,
        backgroundColor: color.indigo700,
      },
    }),
  })
)

export default Blog
