export interface PageMeta {
  $type: 'page';
  $page: {
    key: string;
  }
}

import Minpress from './minpress'

export type DynamicModuleFn = ({ context: Minpress }) => { code: string }
