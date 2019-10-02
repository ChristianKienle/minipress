import { Plugin as PluginType } from '@minipress/types'

interface Options {
  prop: string
}

export type Plugin = PluginType<Options>
