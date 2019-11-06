import { Plugin as PluginType, Page } from '@minipress/types'

interface Options {
  enabled: boolean
}

export type Plugin = PluginType<Options>
