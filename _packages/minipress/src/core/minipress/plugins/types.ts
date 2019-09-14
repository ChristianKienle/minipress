import Minipress from './../minipress'

// Plugins
export type Plugin = [string?, any?]
export type Plugins = Plugin[]
export type _Plugin = {
  id: string
  options?: any
}

import Joi from 'joi'
export interface InvokedPlugin {
  optionsSchema?(minipress: Minipress): Joi.Schema;
  apply(minipress: Minipress, options: any): Promise<void>
}

export interface _ResolvedPlugin {
  entryPointPath: string
  options: any
  apply(minipress: Minipress): Promise<void>
}

export type _Plugins = _ResolvedPlugin[]