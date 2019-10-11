// @ts-check
/* eslint-env node */
const assert = require('assert').strict
const CreateMarkdown = require('./create-md')

const classPrefix = 'component-documentation'
/**
 * @param {string} child
 */
const createScopedClass = child => `${classPrefix}${child}`

/**
 * @typedef {import("@vuese/parser").ParserResult} ParserResult
 * @typedef {import("@vuese/parser").PropsResult} PropsResult
 * @typedef {import("@vuese/parser").EventResult} EventResult
 * @typedef {import("@vuese/parser").SlotResult} SlotResult
 */

/** @param {ParserResult} result */
const getDescription = result => {
  const { componentDesc = { 'default': [] } } = result
  return componentDesc.default
}

/**
 * @param {number} level
 * @param {string} text
 */
const renderHeading = (level, text) => {
  return new CreateMarkdown().raw(`<div class="component-documentation__title component-documentation__title--${level}">${text}</div>`)
}

/**
 * @param {string} text
 * @param {string=} cssClass
 */
const renderDivWithScopedClass = (text, cssClass) => {
  const scopedClass = cssClass == null ? 'component-documentation' : `component-documentation__${cssClass}`
  return new CreateMarkdown().raw(`<div class="${scopedClass}">${text}</div>`)
}

const renderWithScopedClass = (cssClass, children = []) => {
  const scopedClass = createScopedClass(cssClass)
  const attrs = { class: scopedClass }
  return new CreateMarkdown().div({ attrs }, children)
}

/** @param {PropsResult} prop */
const renderProp = prop => {
  const md = new CreateMarkdown()
    .nl()
    .nl()
    .strong('Name:')
    .raw('&nbsp;')
    .raw(prop.name)
    .nl()
    .nl()
    .strong('Type:')
    .raw('&nbsp;')
    .code(prop.type, { defaultValue: 'not specified' })
    .nl()
    .nl()
    .lines(prop.typeDesc, { wrap: true })
    .strong('Default:')
    .raw('&nbsp;')
    .code(prop.default || '–')
    .nl()
    .lines(prop.defaultDesc, { wrap: true })
    .lines(prop.describe, { wrap: true })
    .nl()
    .nl()

  return renderWithScopedClass('__prop', md.tokens)
}

/** @param {EventResult} event */
const renderEvent = event => {
  const md = renderDivWithScopedClass(event.name, 'event-name')
    .nl()
    .lines(event.describe, { wrap: true })
    .nl()
  if (event.isSync) {
    md.raw(`<fd-badge filled>syncs ${event.syncProp}</fd-badge>`).nl()
  }
  md.nl()
    .strong('Arguments:')
    .nl()
  const args = (event.argumentsDesc || []).map(arg => `- ${arg}`)
  md.lines(args, { wrap: true })
  md.nl()
  return md
}

/** @param {SlotResult} slot */
const renderSlot = slot => {
  const md = renderDivWithScopedClass(slot.name, 'slot-name').nl()
  if (slot.scoped) {
    md.raw(`<fd-badge filled>scoped</fd-badge>`).nl()
  }
  md.lines([slot.describe], { wrap: true }).nl()
  return md
}
/** @param {SlotResult[]} slots */
const renderSlots = slots => {
  if (slots.length === 0) {
    return ''
  }
  const md = new CreateMarkdown()
  .nl()
  .nl()
  renderDivWithScopedClass('Slots', 'slots-heading')
  .nl()
  .nl()
  .raw(slots.map(renderSlot), { wrap: true })
  return renderWithScopedClass('__slots', md.tokens)
}
/** @param {EventResult[]} events */
const renderEvents = events => {
  if (events == null) {
    return ''
  }
  if (events.length === 0) {
    return ''
  }
  const md = new CreateMarkdown()
    .nl()
    .nl()
    .raw(renderDivWithScopedClass('Events', 'events-heading'))
    .nl()
    .nl()
  events.forEach(event => md.raw(renderEvent(event), { wrap: true }))
  md
    .nl()
    .nl()
  return renderWithScopedClass('__events', md.tokens)
}

/** @param {PropsResult[]} props */
const renderProps = (props = []) => {
  if (props.length === 0) {
    return ''
  }
  const md = new CreateMarkdown()
    .nl()
    .nl()
    .raw(renderDivWithScopedClass('Props', 'props-heading'))
    .nl()
    .nl()
    .raw(props.map(renderProp), { wrap: true })
    .nl()
    .nl()
  return renderWithScopedClass('__props', md.tokens)
}

/** @param {import("@vuese/parser").ParserResult} componentApi */
const render = componentApi => {
  assert(componentApi != null)
  assert(typeof componentApi === 'object')
  // renderDivWithScopedClass('name', componentApi.name)
  const md = new CreateMarkdown()
    .raw('<div class="component-documentation">')
    .nl()
    .nl()
    .lines(getDescription(componentApi), { wrap: true })
    .nl()
    .nl()
    .raw(renderProps(componentApi.props))
    .nl()
    .nl()
    .raw(renderSlots(componentApi.slots))
    .nl()
    .nl()
    .raw(renderEvents(componentApi.events))
    .nl()
    .nl()
    .raw('</div>')
  if (md == null) {
    throw Error(`Unable to render API for component ${componentApi} because 'renderMarkdown' returned 'null'.`)
  }
  return md.render()
}

module.exports = render
