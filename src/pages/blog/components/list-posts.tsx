import React from 'react'
import {Link} from 'react-router-dom'
import {Column, Row} from '@dash-ui/react-layout'
import {useOrder, slugify, preload} from 'proser'
import {DynamicList, useScroller, useSize} from 'mini-virtual-list'
import type {DynamicListRenderProps} from 'mini-virtual-list'
import {Text} from '@design-system/text'
import type {TextProps} from '@design-system/text'
import {Image} from '@design-system/image'
import {Divider} from '@design-system/divider'
import {styles} from '@design-system/styles'
import {tokens} from '@design-system/tokens'
import {useOffset} from '@hooks/offset'
import * as components from '../posts/components'
import type {Post} from '../posts'

export function ListPosts({posts}: ListPostsProps) {
  const orderedPosts = useOrder(posts, 'desc')
  const ref = React.useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  const offset = useOffset(ref, [size.width])
  const scroll = useScroller(window, {offset, fps: 16})
  const BlogPostCardMemo = React.useCallback(
    (props: DynamicListRenderProps<Post>) => (
      <BlogPostCard {...props} numPosts={orderedPosts.length} />
    ),
    [orderedPosts.length]
  )

  return (
    <div ref={ref}>
      <DynamicList
        key={orderedPosts.length}
        items={orderedPosts}
        itemHeightEstimate={162 / 2}
        itemGap={parseInt(tokens.gap.xl) * 16}
        overscanBy={8}
        {...size}
        {...scroll}
        render={BlogPostCardMemo}
      />
    </div>
  )
}

export interface ListPostsProps {
  posts: Post[]
}

function BlogPostCard({
  data: post,
  measure,
  width,
  index,
  numPosts,
}: BlogPostCardProps) {
  React.useEffect(measure, [measure, width, post.id])

  return (
    <React.Fragment>
      <Column as='section' gap='lg' className={postCard()}>
        {/* @ts-ignore */}
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
                  rel='category'
                  onMouseEnter={() => import('../category')}
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
          className={postCard.link()}
          gap='lg'
        >
          <Column gap='md'>
            <h2>{post.metadata.title}</h2>
            <blockquote>{post.metadata.description}</blockquote>
            {post.metadata.image && (
              <div className={postCard.imgContainer()}>
                <Image
                  src={post.metadata.image}
                  alt={`A photo for the "${post.metadata.title}" post`}
                  onLoad={measure}
                />
              </div>
            )}
          </Column>

          <Text color='indigo700'>
            Hear me out{' '}
            <Text color='gray800'>
              &middot; {post.metadata.readingTime.text}
            </Text>
          </Text>
        </Column>
      </Column>
      {index < numPosts - 1 && <Divider />}
    </React.Fragment>
  )
}

export interface BlogPostCardProps extends DynamicListRenderProps<Post> {
  numPosts: number
}

const postCard = Object.assign(
  styles.one(({pad}) => ({
    paddingBottom: pad.lg,
  })),
  {
    imgContainer: styles.one(({radius}) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      maxHeight: 400,
      borderRadius: radius.primary,

      picture: {
        minHeight: '100%',
        maxWidth: 'none',
        width: 'auto',

        img: {
          width: 'auto',
          maxWidth: 'none',
        },
      },
    })),
    link: styles.one({
      textDecoration: 'none',
      '.using-keyboard &:focus': {
        textDecoration: 'underline',
      },
    }),
  }
)
