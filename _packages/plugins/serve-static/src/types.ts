import { Plugin as PluginType } from '@minipress/types'

interface Options {
  as?: string
  dir: string
}

export type Plugin = PluginType<Options>
