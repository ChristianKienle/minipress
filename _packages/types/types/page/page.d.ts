import { Headings, Heading } from './heading'
import { File } from './file'

// A unvalidated Page
export interface Page {
  attributes?: { [name: string]: any }
  content?: string
  contentType?: string
  file?: File
  frontmatter?:  { [name: string]: any }
  headings?: Headings
  key?: string
  path?: string
  permalink?: string
  regularPath?: string
  layout?: string
}

// Previously: _Page
// Represents a page that can be further processed by minipress
export interface ProcessablePage {
  file: File
  key?: string
  frontmatter:  { [name: string]: any }
  attributes: { [name: string]: any }
  path?: string
  regularPath?: string
  // we always need some kind of content…
  content: string
  contentType: string
  headings: Headings
  permalink?: string
  layout?: string
}

// Previously: ___Page
// Represents a page that can be emitted
export interface EmittablePage {
  file: File
  key: string
  frontmatter:  { [name: string]: any }
  attributes: { [name: string]: any }
  path?: string
  regularPath?: string
  // we always need some kind of content…
  content: string
  contentType: string
  headings: Headings
  permalink?: string
  layout?: string
}