import { _Config } from './../config'
import * as Logger from '@minipress/log/index'
export interface MinipressI {
  readonly config: _Config
  readonly log: Logger

  dev(options: {
    watch?: boolean
    mode?: 'development' | 'production'
    port: number
    host: string
  }): Promise<void>

  generate(options: {
    mode?: 'development' | 'production'
    outDir: string
  }): Promise<void>
}
