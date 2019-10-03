import { BuildConfig, _BuildConfig } from './build'
import { MinipressI } from './../minipress'
import { Plugin } from './plugin'

// Normalized Config
export interface _Config {
  cwd: string
  dest: string
  tempDir: string
  port: number
  host: string
  plugins: Plugin[]
  build: _BuildConfig
  apply(minipress: MinipressI): Promise<void>
}

// Config
export type Config = Partial<_Config>
export {
  Plugin as ConfigPlugin,
  _Plugin as _ConfigPlugin,
  ExecutablePlugin as ConfigExecutablePlugin
} from './plugin'

export {
  _BuildConfig as _ConfigBuildConfig,
  BuildConfig as ConfigBuildConfig
}

// export * from './build'
// export { BuildConfig, _BuildConfig } from './build'

