import { Plugin as PluginType } from '@minipress/types'

interface Options {
  renderer: 'vuese-markdown' | 'minipress-markdown'
}

export type Plugin = PluginType<Options>
