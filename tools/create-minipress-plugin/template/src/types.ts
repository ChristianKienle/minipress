import { Plugin } from '@minipress/types'

interface Options {
  prop: string
}

type _Plugin = Plugin<Options>

export default _Plugin
