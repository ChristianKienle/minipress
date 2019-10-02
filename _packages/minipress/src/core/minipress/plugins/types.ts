import Minipress from './../minipress'

// Plugins
type PluginIdOrObject = string | InvokedPlugin
export type Plugin = [PluginIdOrObject?, any?]
export type Plugins = Plugin[]
export type _Plugin = {
  id: string
  options?: any
}

import Joi from 'joi'
export interface InvokedPlugin {
  name?: string;
  optionsSchema?(minipress: Minipress): Joi.Schema;
  apply(minipress: Minipress, options: any): Promise<void>
}

export interface SealedPlugin {
  name: string;
  entryPointPath?: string
  options: any
  apply(minipress: Minipress): Promise<void>
}

export type _Plugins = SealedPlugin[]