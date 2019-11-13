import { Page } from '../../types/types/page'
import MarkdownIt from 'markdown-it'

export interface MarkdownEnv {
 page?: Page & object
}

export type MarkdownItPlugin = (md: MarkdownIt, ...args: any[]) => void
