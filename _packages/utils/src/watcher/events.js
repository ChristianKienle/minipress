// @ts-check

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
  isKnownEvent,
  allEvents
}
