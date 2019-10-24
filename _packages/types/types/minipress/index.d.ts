import { _Config } from './../config'
import { ComponentsI } from './components'
import * as Logger from '@minipress/log/index'
import Joi from '@hapi/joi'
import Cli from '@minipress/cli'
import { Page, EmittablePage } from './../page'

interface Hooks {

}

export { ComponentsI } from './components'

export interface MinipressI {
  readonly config: _Config
  readonly log: typeof Logger
  readonly joi: typeof Joi
  readonly hooks: Hooks
  readonly components: ComponentsI
  readonly globalComponents: ComponentsI
  readonly cli: InstanceType<Cli>

  // Public API
  addPage(page: Page): Promise<EmittablePage>

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
