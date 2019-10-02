import { BuildConfig, _BuildConfig } from './build'
import { MinipressI } from './../minipress'

// Normalized Config
export interface _Config {
  cwd: string
  dest: string
  tempDir: string
  port: number
  host: string
  build: _BuildConfig
  apply(minipress: MinipressI): Promise<void>
}

// Config
export type Config = Partial<_Config>

export * from './build'
