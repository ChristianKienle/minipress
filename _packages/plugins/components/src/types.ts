
// Components
interface ComponentsConfig {
  components: string | ComponentNameByPath
  getComponentName?: GetComponentName
}

export type Components = string | ComponentsConfig

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

export type GetComponentName = (context: ComponentNameContext, defaultName: string) => string;

type ComponentsListener = (component: Component) => void

export interface _Components {
  onAdded(listener: ComponentsListener): this
  onRemoved(listener: ComponentsListener): this
  onChanged(listener: ComponentsListener): this
  getComponents(): Promise<Component[]>
  close(): void
}
import { Plugin as _Plugin } from './../../plugin'

export type Options = Components
export type Plugin = _Plugin<Options>
