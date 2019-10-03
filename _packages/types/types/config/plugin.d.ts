// This file contains types for plugins as they have to be specified
// within a miniPress configuration file.
// Don't confuse this with the types defined in ../plugin.
// Those types describe how a plugin looks like from a plugin developers
// point of view.
import { Plugin as ResolvedPlugin } from './../plugin'
import { MinipressI } from './../minipress'
type IdOrResolvedPlugin = string | ResolvedPlugin

// A plugin as provided by the user in the config.
// Potentially invalid.
export type Plugin<Options = any> = Partial<_Plugin<Options>>

// A normalized plugin as provided by the user in the config.
// Semantically correct but could still be invalid (unable
// to resolve)
export type _Plugin<Options = any> = [
  // The actual plugin (either a module id or a resolved plugin).
  // This allows someone to refer to a plugin either
  // - by name: '@minipress/plugin-clean-urls'
  // or
  // - by using require: require('@minipress/plugin-clean-urls')
  IdOrResolvedPlugin,
  // The options – if any
  Options?
]

// Normalized Plugin
// export interface _Plugin {
//   id: IdOrResolvedPlugin
//   options?: any
// }

// import Joi from 'joi'
// export interface InvokedPlugin {
//   name?: string;
//   optionsSchema?(minipress: Minipress): Joi.Schema;
//   apply(minipress: Minipress, options: any): Promise<void>
// }

// This describes a plugin that has been validated and normalized.
// apply(…) no longer needs options because it is done by the function
// that makes the plugin executable.
export interface ExecutablePlugin {
  name: string;
  entryPointPath?: string
  options: any
  apply(minipress: MinipressI): Promise<void>
}

// export type _Plugins = ExecutablePlugin[]