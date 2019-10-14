import { Plugin as PluginType } from '@minipress/types'

export interface Context {
  title: string
}

export interface Options {
  type: string
  defaultTitle: string
  renderBefore?(context: Context): string
  renderAfter?(): string
}

export type Plugin = PluginType<Options>
