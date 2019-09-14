import Minipress from './../minipress/src/core/minipress/minipress'
import { Joi } from './../../_packages/types'

export interface Plugin {
 apply(minipress: Minipress, options: any): Promise<any>
 optionsSchema?(minipress: Minipress): Joi.Schema;
}
