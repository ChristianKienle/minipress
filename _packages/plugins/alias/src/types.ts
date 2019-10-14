import { Plugin as PluginType } from '@minipress/types'

interface Options {
  name: string
  path: string
}

export type Plugin = PluginType<Options>
