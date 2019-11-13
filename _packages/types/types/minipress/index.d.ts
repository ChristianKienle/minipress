import { _Config } from './../config'
import { ComponentsI } from './components'
import { PagesI } from './pages'
import { PageTransformersI } from './page-transformers'
import * as Logger from '@minipress/log/index'
import Joi from '@hapi/joi'
import Cli from '@minipress/cli'
import { Page, EmittablePage } from './../page'
import { AsyncSeriesHook } from 'tapable'
import MarkdownChain from '@minipress/markdown-chain'

interface Hooks {
  readonly chainMarkdown: AsyncSeriesHook<InstanceType<typeof MarkdownChain>>
  readonly configureSiteData: AsyncSeriesHook<object>
  readonly registerComponents: AsyncSeriesHook<ComponentsI>
  readonly emitPages: AsyncSeriesHook<PagesI>
  readonly registerPageTransformers: AsyncSeriesHook
}

export { ComponentsI } from './components'
export { PagesI } from './pages'

export interface MinipressI {
  readonly config: _Config
  readonly log: typeof Logger
  readonly joi: typeof Joi
  readonly hooks: Hooks
  readonly components: ComponentsI
  readonly pages: PagesI
  readonly pageTransformers: PageTransformersI
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
