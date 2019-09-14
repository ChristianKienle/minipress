// @ts-check

const hash = require('hash-sum')

/**
 * @param {string} plain
 */
module.exports = plain => `${hash(plain)}`
