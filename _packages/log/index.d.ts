import * as Log from './src/index'

// declare module '@minipress/log' {
  // interface Logger {
  //   constructor(): Logger
  //   info(message: string): void
  //   error(message: string): void
  //   success(message: string): void
  // }


  // const log: Logger
  // export { log, Logger }
// }
// import Log from './src/index'
declare const log: typeof Log
export = log;
