import { Plugin as PluginType } from '@minipress/types'

export interface Options {
  // default: false
  readonly skipGenerate: boolean
  readonly ghpagesOptions: object
}

export type Plugin = PluginType<Options>
