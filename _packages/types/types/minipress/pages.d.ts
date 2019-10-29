import { EmittablePage } from './../page'

type Condition = (page: EmittablePage) => boolean

export interface PagesI {
  get(key: string): EmittablePage | undefined
  set(page: EmittablePage): EmittablePage
  remove(key: string): EmittablePage | undefined
  removeWhere(condition: Condition): EmittablePage | undefined
  values(): EmittablePage[]
}
