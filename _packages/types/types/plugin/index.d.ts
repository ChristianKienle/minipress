import { MinipressI } from './../minipress'
import { Schema } from 'joi'

export interface Plugin {
 apply(minipress: MinipressI, options?: any): Promise<any>
 optionsSchema?(minipress: MinipressI): Schema;
}
