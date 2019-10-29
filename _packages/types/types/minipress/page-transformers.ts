import { EmittablePage } from './../page'

type PageTransformer = (page: EmittablePage) => Promise<void>

export interface PageTransformersI {
  add(transformer: PageTransformer)
  transform(page: any): Promise<void>
}
