export interface PageMeta {
  $type: 'page';
  $page: {
    key: string;
    relativePath: string;
  }
}

import Minipress from './minipress/minipress'

export type DynamicModuleFn = (args: { context: Minipress }) => { code: string }
