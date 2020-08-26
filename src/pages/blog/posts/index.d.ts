/**
 * 🔆 You can and should edit this file to match your actual Post type.
 *    if you're using extra or different metadata.
 */
import React from 'react'

export type Post = {
  id: number
  slug: string
  component: React.LazyExoticComponent<(props: any) => JSX.Element>
  metadata: {
    title: React.ReactNode
    description: React.ReactNode
    timestamp: number
    image?: Promise<typeof import('*.jpg')>
    categories: string[]
    tags: string[]
    readingTime: {
      text: string
      time: number
      words: number
    }
    meta?: {
      description?: string
    }
  }
}

export const postsMap: Record<string, Post>
export const postsMapById: Record<number, Post>
export const posts: Post[]
