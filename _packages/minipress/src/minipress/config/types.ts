// Raw Page Interface – as produced by a page provider
// Mimicks the page interface from VuePress.
export interface _Page {
  _filePath: string; // file's absolute path
  regularPath: string; // current page's default link (follow the file hierarchy)
  path: string; // current page's default link (follow the file hierarchy)
  createKey(): string;
}

export interface Navbar {
  items: NavbarItem[];
}

export interface NavbarItem {
  text: string;
  link: string;
}

export type LayoutNameToPath = { [layoutName: string]: string }
export type Layouts =
  | string /* path to a layouts-directory */
  | LayoutNameToPath

export type _Layouts = LayoutNameToPath

export interface _BuildConfig {
  outDir: string;
  base: string;
}

import Minipress from './../core/minipress'

export type BuildConfig = Partial<_BuildConfig>
export type DynamicModules = { [name: string]: string }
export type SiteDataConfigurator = (site: object) => Promise<object | void>
export type _SiteDataConfigurator = (site: object) => Promise<object>
export interface Config {
  pages?: string
  cwd?: string
  dest?: string
  tempDir?: string
  navbar?: Navbar
  layouts?: Layouts
  port?: number
  host?: string
  components?: string
  build?: BuildConfig
  theme?: Theme
  themeConfig?: object
  configureSiteData?: SiteDataConfigurator
  dynamicModules?(options: { context: Minipress }): DynamicModules
}


export interface PagePath {
  absolute: string
  relative: string
}

type PageListener = (page: _Page) => void
type Off = () => void

export interface Pages {
  onAdded(listener: PageListener): Off
  onRemoved(listener: PageListener): Off
  onChanged(listener: PageListener): Off
  onReady(listener: (pages: _Page[]) => void): Off
  resume(): Promise<_Page[]>
  close(): void
}

export interface ComponentPath {
  absolute: string
  relative: string
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
export interface Components {
  onAdded(listener: ComponentsListener): Off
  onRemoved(listener: ComponentsListener): Off
  onChanged(listener: ComponentsListener): Off
  onReady(listener: (components: Component[]) => void): Off
  resume(): Promise<Component[]>
  close(): void
  nameForComponent: ComponentNameFn;
}

export type ThemeObject = Pick<Config, 'dynamicModules' | 'layouts' | 'components'>
export type _ThemeObject = Pick<_Config, 'dynamicModules' | 'layouts' | 'components'>

export type Theme = <ThemeConfig extends {} = {}>(themeConfig: ThemeConfig) => ThemeObject
export type _Theme = <ThemeConfig extends {} = {}>(themeConfig: ThemeConfig) => _ThemeObject

export interface _Config {
  pages: Pages
  cwd: string
  dest: string
  tempDir: string
  navbar: Navbar
  layouts: _Layouts
  port: number
  host: string
  components: Components
  build: _BuildConfig
  theme: _Theme
  themeConfig: object
  configureSiteData: _SiteDataConfigurator
  dynamicModules(options: { context: Minipress }): DynamicModules
}
