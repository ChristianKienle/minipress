// @ts-check
export type EventName = 'added' | 'changed' | 'removed'
export type Listener = (event: EventName, path: string) => void

export interface WatcherI {
  on(listener: Listener): void
  resume()
  close()
}
