import React from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {Column, Row, Cluster} from '@dash-ui/react-layout'
import {prose} from '@design-system/prose'
import {Text} from '@design-system/text'
import type {TextProps} from '@design-system/text'
import {Spinner} from '@design-system/spinner'
import {Divider} from '@design-system/divider'
import {styles} from '@design-system/styles'
import {mq} from '@design-system/mq'
import {slugify} from 'proser'
import * as components from '../posts/components'
import type {Post as PostType} from '../posts'
import {RelatedPosts} from './related-posts'

export function Post({post, posts}: PostProps) {
  const {component: Component, metadata} = post
  const primaryCategory = metadata.categories[0]

  return (
    <Column as='article' gap='xl'>
      <Helmet>
        <title>
          {metadata.title} / {primaryCategory}
        </title>
        <meta
          name='description'
          content={(metadata?.meta?.description || metadata.description) as any}
        />
        <link
          rel='canonical'
          href={`https://jaredlunde.com/posts/${slugify(primaryCategory)}/${
            post.slug
          }`}
        />
      </Helmet>

      {/* @ts-expect-error */}
      <Row
        as={(props: TextProps) => <Text as='div' {...props} />}
        gap='md'
        variant='caption'
      >
        <components.time>{metadata.timestamp}</components.time>
        <span aria-hidden>&mdash;</span>
        <Row as='span' gap='sm'>
          {metadata.categories.map((category) => (
            <React.Fragment key={category}>
              <Link to={`/posts/${slugify(category)}`} rel='category'>
                {category}
              </Link>
            </React.Fragment>
          ))}
        </Row>
      </Row>

      <Column gap='md'>
        <h1>{metadata.title}</h1>
        <h2>{metadata.description}</h2>
      </Column>

      <Column gap='lg'>
        <div className={prose()}>
          <React.Suspense
            fallback={
              <Column width='100%' align='center' pad={['xl', 'none']}>
                <Spinner size='2em' />
              </Column>
            }
          >
            <Component />
          </React.Suspense>
        </div>

        <div>
          <Cluster as='div' gap='sm' className={tags()}>
            {metadata.tags.map((tag) => (
              <React.Fragment key={tag}>
                <Link to={`/posts/tagged/${slugify(tag)}`} rel='tag'>
                  {tag}
                </Link>
              </React.Fragment>
            ))}
          </Cluster>
        </div>

        <Divider />

        <Column gap='xxl'>
          <Column gap='sm'>
            <Column>
              <Text as='div' variant='caption'>
                Written by
              </Text>
              <h3 className='author'>Jared Lunde</h3>
            </Column>
            <blockquote>
              <Text as='p' size='sm' color='gray600'>
                <span role='img' aria-label='Peace sign emoji'>
                  ✌️
                </span>{' '}
                Living in Denver and building the things that make me curious
              </Text>
            </blockquote>
          </Column>

          <RelatedPosts key={post.id} post={post} posts={posts} />
        </Column>
      </Column>
    </Column>
  )
}

export interface PostProps {
  post: PostType
  posts: PostType[]
}

const tags = styles.one(
  mq({
    default: ({color, hairline, radius, pad}) => ({
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
        color: color.indigo100,
        backgroundColor: color.indigo800,
      },
    }),
  })
)
