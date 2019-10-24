import Minipress from './../minipress/src/core/minipress/minipress'
import { Joi } from './../../_packages/types'

export interface Plugin<Options = any> {
 apply(minipress: Minipress, options: Options): Promise<any>
 optionsSchema?(minipress: Minipress): Joi.Schema;
}
