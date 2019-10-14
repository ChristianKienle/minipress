// @ts-check

const Head = require('./../index')

describe('Head', () => {
  it('renders Title', () => {
    expect(new Head().title('hello')
      .renderToString()).toMatchSnapshot()
  })

  it('renders Description', () => {
    expect(new Head().description('my site')
      .renderToString()).toMatchSnapshot()
  })

  it('renders Meta', () => {
    expect(new Head().meta('Test', 'value')
      .renderToString()).toMatchSnapshot()
  })
})
