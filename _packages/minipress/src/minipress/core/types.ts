export interface PageMeta {
  $type: 'page';
  $page: {
    key: string;
    relativePath: string;
  }
}

import Minpress from './minipress'

export type DynamicModuleFn = ({ context: Minpress }) => { code: string }
