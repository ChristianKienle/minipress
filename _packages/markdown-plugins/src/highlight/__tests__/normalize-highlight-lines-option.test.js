// @ts-check
const { normalizeEntry, normalize } = require('./../normalize-highlight-lines-option')

describe('highlight markdown plugin – normalize highlight lines option', () => {
  describe('normalizeEntry', () => {
    it('works for number', () => {
      expect(normalizeEntry(1)).toEqual([1])
    })

    it('works for void', () => {
      expect(normalizeEntry()).toEqual([])
    })

    it('works for range', () => {
      expect(normalizeEntry('1-3')).toEqual([1, 2, 3])
    })
  })

  describe('normalize', () => {
    it('works for number', () => {
      expect(normalize([1])).toEqual([1])
    })

    it('works for void', () => {
      expect(normalize()).toEqual([])
    })

    it('works for range', () => {
      expect(normalize(['1-3'])).toEqual([1, 2, 3])
    })

    it('works for range + single lines', () => {
      expect(normalize(['1-3', 5])).toEqual([1, 2, 3, 5])
    })
  })
})