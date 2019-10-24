// @ts-check

class WatcherEvent {
  static get ADDED() {
    return 'added'
  }

  static get CHANGED() {
    return 'changed'
  }
  static get REMOVED() {
    return 'removed'
  }
}

const allEvents = new Set(['added', 'changed', 'removed'])

/**
 * @typedef {import('./types').EventName} EventName
 */
/**
 * @param {string} event
 * @returns {event is EventName}
 */
const isKnownEvent = event => allEvents.has(event)

module.exports = {
  WatcherEvent,
  isKnownEvent,
  allEvents
}
