// @ts-check
const extract = require('./../extract')
describe('extract frontmatter', () => {
  it('can handle boolean', () => {
    const frontmatter = extract('---\nyes: true\nno: false\n---\n\nbody')
    expect(frontmatter.attributes).toMatchObject({
      yes: true,
      no: false
    })
  })

  it('can handle dates', () => {
    const { attributes } = extract('---\ndate: 2020-01-31\n---\n\nbody')
    const { date } = attributes
    expect(date).toBeDefined()
    expect(date).toBeInstanceOf(Date)
    /**
     * @type {Date}
     */
    const _date = date
    expect(_date.getFullYear()).toEqual(2020)
    expect(_date.getMonth()).toEqual(0)
    expect(_date.getDate()).toEqual(31)
  })

})