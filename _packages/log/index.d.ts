declare module '@minipress/log' {
  interface Logger {
    constructor(): Logger
    info(message: string): void
    error(message: string): void
  }

  const log: Logger

  export { log, Logger }
}