import { Plugin as PluginType, Page } from '@minipress/types'

export type PostsCompareFunction = (p1: Page, p2: Page) => number

interface Options {
  posts: string // defaults to '.posts'
  path: string // defaults to '/blog/
  comparePosts: PostsCompareFunction // uses a sensible sort function by default
}

export interface Post {
  excerpt: string
  page: Page
}

export type Plugin = PluginType<Options>
