
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
type Off = () => void
