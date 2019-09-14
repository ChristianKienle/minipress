import { ProcessablePage } from './page'

export interface Transformer {
  getContentComponent(page: ProcessablePage): Promise<string>
  getPageComponent(page: ProcessablePage): Promise<string>
  transform(page: ProcessablePage): Promise<void>
  parse(page: ProcessablePage): Promise<void>
}
