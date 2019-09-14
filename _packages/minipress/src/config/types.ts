import Minipress from './../core/minipress/minipress'
import { Page } from './../core/_pages/types'
export { Page } from './../core/_pages/types'

// Config
export interface Config {
  cwd?: string
  dest?: string
  tempDir?: string
  port?: number
  host?: string
  build?: BuildConfig
  apply?(minipress: Minipress): Promise<void>
}

// Normalized Config
export interface _Config {
  cwd: string
  dest: string
  tempDir: string
  port: number
  host: string
  build: _BuildConfig
  apply(minipress: Minipress): Promise<void>
}

// Plugins
export type Plugin = [string?, any?]
export type Plugins = Plugin[]
export type _Plugin = {
  id: string
  options?: any
}

import Joi from 'joi'
export interface InvokedPlugin {
  optionsSchema?(): Joi.Schema;
  apply(minipress: Minipress, options: any): Promise<void>
}

export interface _ResolvedPlugin {
  entryPointPath: string
  options: any
  apply(minipress: Minipress): Promise<void>
}

export type _Plugins = _ResolvedPlugin[]

// Layouts
export type LayoutNameToPath = { [layoutName: string]: string }

export type Layouts =
  | string /* path to a layouts-directory */
  | LayoutNameToPath

export type _Layouts = LayoutNameToPath

// Build
export interface _BuildConfig {
  outDir: string;
  base: string;
}
export type BuildConfig = Partial<_BuildConfig>

// Dynamic Modules
export type DynamicModules = { [name: string]: string }
interface DynamicModulesOptions {
  context: Minipress
};

// Site Data
export type SiteDataConfigurator = (site: object) => Promise<object | undefined>
export type _SiteDataConfigurator = (site: object) => Promise<object>

// Components
export type Components = string | ComponentNameByPath

export type ComponentNameByPath = { [name: string]: string }
export interface ComponentPath {
  absolute: string
  relative?: string
}

export interface Component {
  name: string;
  path: ComponentPath;
}

export type ComponentNameContext = {
  path: ComponentPath;
}

export type ComponentNameFn = (context: ComponentNameContext) => string;
type ComponentsListener = (component: Component) => void
export interface _Components {
  onAdded(listener: ComponentsListener): Off
  onRemoved(listener: ComponentsListener): Off
  onChanged(listener: ComponentsListener): Off
  onReady(listener: (components: Component[]) => void): Off
  resume(): Promise<Component[]>
  close(): void
}

// Pages
export type PageListener = (page: Page) => void
type Off = () => void

export interface Pages {
  onAdded(listener: PageListener): Off
  onRemoved(listener: PageListener): Off
  onChanged(listener: PageListener): Off
  onReady(listener: (pages: Page[]) => void): Off
  resume(): Promise<Page[]>
  close(): void
}

// Head
interface HeadConfig {
  title?: string
  description?: string
  meta?: { [name: string]: string }
}

interface _HeadConfig {
  title: string
  description: string
  meta: { [name: string]: string }
}

export type Head = HeadConfig
export type _Head = (page?: Page) => _HeadConfig

// Page Transformer
export type PageTransformer = (page: Page) => Promise<void>
