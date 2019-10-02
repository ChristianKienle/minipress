import { MinipressI } from './../minipress'
import { Schema } from 'joi'

export interface Plugin<Options = any> {
  apply(minipress: MinipressI, options?: Options): Promise<any>
  optionsSchema?(minipress: MinipressI): Schema;
  name?: string;
}
