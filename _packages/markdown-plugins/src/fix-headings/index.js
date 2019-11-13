// @ts-check
const LevelMapping = Object.freeze({
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6
})
const { hasBeginMark, hasEndMark } = require('./mark')

const isEmbedToken = token => token.content.trim() === '@@@'
const isHeadingOpenToken = token => token.type === 'heading_open'
const isHeadingCloseToken = token => token.type === 'heading_close'
const headingLevelOfToken = token => LevelMapping[token.tag]
const removeMarkFromToken = token => token.content = ''

const shiftHeadingTokenBy = (token, shiftLevelBy = 0) => {
  const level = headingLevelOfToken(token)
  const newLevel = level + shiftLevelBy
  token.tag = `h${newLevel}`
  token.markup = '######'.slice(0, newLevel)
}

module.exports = function (md, options) {
  const fixHeadings = (state, startLine, endLine, silent) => {
    const { tokens } = state
    let currentLevel = 0
    let levelDelta = 0
    let fixingHeadings = false
    for (const token of tokens) {
      if (isHeadingOpenToken(token)) {
        if (fixingHeadings) {
          shiftHeadingTokenBy(token, levelDelta)
        } else {
          levelDelta = headingLevelOfToken(token)
        }
      }
      if (isHeadingCloseToken(token)) {
        if (fixingHeadings) {
          shiftHeadingTokenBy(token, levelDelta)
        }
      }

      if (hasBeginMark(token.content)) {
        fixingHeadings = true
        removeMarkFromToken(token)
      }

      if (hasEndMark(token.content)) {
        removeMarkFromToken(token)
        fixingHeadings = false
      }
    }
    const headingOpenTokens = tokens.filter(isHeadingOpenToken)

  }
  md.core.ruler.push('fixheadings', fixHeadings)
}
