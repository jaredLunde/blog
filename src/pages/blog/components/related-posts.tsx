import React from 'react'
import {Link} from 'react-router-dom'
import {Column, Row} from '@dash-ui/react-layout'
import {Text} from '@design-system/text'
import type {TextProps} from '@design-system/text'
import {Image} from '@design-system/image'
import {styles} from '@design-system/styles'
import {useRelatedPosts, slugify, preload} from 'proser'
import * as components from '../posts/components'
import type {Post} from '../posts'

export function RelatedPosts({post, posts}: RelatedPostsProps) {
  const relatedPosts = useRelatedPosts(posts, post)

  return (
    <Column as='aside' gap='xl'>
      {relatedPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </Column>
  )
}

export interface RelatedPostsProps {
  post: Post
  posts: Post[]
}

function BlogPostCard({post}: BlogPostCardProps) {
  return (
    <React.Fragment>
      <Column as='section' gap='lg' className={blogPostCard()}>
        {/* @ts-expect-error */}
        <Row
          as={(props: TextProps) => <Text as='div' {...props} />}
          gap='md'
          variant='caption'
        >
          <components.time>{post.metadata.timestamp}</components.time>{' '}
          <span aria-hidden>&mdash;</span>
          <Row as='span' gap='sm'>
            {post.metadata.categories.map((category) => (
              <React.Fragment key={category}>
                <Link
                  to={`/posts/${slugify(category)}`}
                  onMouseEnter={() => import('../category')}
                  rel='category'
                >
                  {category}
                </Link>
              </React.Fragment>
            ))}
          </Row>
        </Row>

        <Column
          as={Link}
          to={`/posts/${slugify(post.metadata.categories[0])}/${post.slug}`}
          onMouseEnter={() => preload(post.component)}
          className={blogPostCard.link()}
          gap='lg'
        >
          <Column>
            <h3>
              <b>{post.metadata.title}</b>
            </h3>
            <Text as='h4' size='base'>
              {post.metadata.description}
            </Text>
          </Column>

          {post.metadata.image && (
            <Image
              src={post.metadata.image}
              alt={`A photo for the "${post.metadata.title}" post`}
              radius='sm'
            />
          )}

          <Text color='indigo700'>
            Hear me out{' '}
            <Text color='gray800'>
              &middot; {post.metadata.readingTime.text}
            </Text>
          </Text>
        </Column>
      </Column>
    </React.Fragment>
  )
}

export interface BlogPostCardProps {
  post: Post
}

const blogPostCard = Object.assign(
  styles.one(({radius, hairline, color, pad}) => ({
    background: color.white,
    padding: pad.lg,
    borderRadius: radius.primary,
    border: `${hairline} solid ${color.translucent}`,
  })),
  {
    link: styles.one({
      textDecoration: 'none',
      '.using-keyboard &:focus': {
        textDecoration: 'underline',
      },
    }),
  }
)
