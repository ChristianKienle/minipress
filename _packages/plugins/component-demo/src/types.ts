import { Plugin as PluginType } from '@minipress/types'

interface Options {
  dir: string
}

export type Plugin = PluginType<Options>
