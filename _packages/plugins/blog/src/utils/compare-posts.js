// @ts-check

/** @type {import('./../types').PostsCompareFunction} */
module.exports = (
  { frontmatter: lhsFrontmatter = {}},
  { frontmatter: rhsFrontmatter = {}}
) => {
  const { date: lhsDate } = lhsFrontmatter
  const { date: rhsDate } = rhsFrontmatter
  if(lhsDate == null && rhsDate == null) {
    return 0
  }
  if(lhsDate == null) {
    return 1
  }
  if(rhsDate == null) {
    return -1
  }
  return rhsDate.valueOf() - lhsDate.valueOf()
}
