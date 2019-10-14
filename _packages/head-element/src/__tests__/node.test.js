// @ts-check

const Node = require('./../node')

describe('Node', () => {
  it('renders simple link (empty, no attributes)', () => {
    expect(new Node('link', {}, Node.IS_EMPTY, '').toString()).toMatchSnapshot()
  })

  it('renders simple link (not empty, no attributes)', () => {
    expect(new Node('link', {}, Node.IS_NOT_EMPTY, '').toString()).toMatchSnapshot()
  })

  it('renders simple link (not emptry with single attr)', () => {
    expect(new Node('link', { test: 'hihi' }, Node.IS_NOT_EMPTY, '').toString()).toMatchSnapshot()
  })

  it('renders simple link (emptry with single attr)', () => {
    expect(new Node('link', { test: 'hihi' }, Node.IS_EMPTY, '').toString()).toMatchSnapshot()
  })
})
