import { Plugin } from './index'
import joi from 'joi'

type O = {
  hello: string
}

const p1: Plugin<O> = {
  async apply(minipress, options) {
    options.hello

  },
  optionsSchema(minipress) {
    return joi.any()
  }
}
