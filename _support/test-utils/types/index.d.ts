// /// <reference types="node" />
// import TempDir from './temp-dir'

// declare module '@minipress/test-utils' {
//   // export { default as TempDir } from './temp-dir'
//   let createTempDir: () => TempDir
//   let m: typeof<{
//     TempDir,
//     createTempDir
//   }>
//   export default
// }


import TestUtils from './../src/index'
declare const testUtils: typeof TestUtils
export = testUtils;
