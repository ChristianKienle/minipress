import Head from '@minipress/head-element/src/index'
import { Plugin as PluginType } from '@minipress/types'

interface HeadConfig {
  title?: string
  description?: string
  meta?: { [name: string]: string }
}

type HeadFn = (head: Head, url: string, minipress: any) => void
type Options = HeadFn | Partial<HeadConfig>;
export type Plugin = PluginType<Options>
