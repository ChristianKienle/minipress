// @ts-check
const Path = require('path')
const express = require('express')
const serveStatic = require('serve-static')

/**
 * @typedef {object} Options
 * @prop {string} dir
 * @prop {number} port
 *
 * @typedef {object} ServeInfo
 * @prop {string} url
 * @prop {import('express').Express} server
 */

/**
 * @param {import('@minipress/types')._Config} config
 * @param {Options} options
 * @returns {Promise<ServeInfo>}
 */
module.exports = ({ build }, { dir, port }) => {
  return new Promise((resolve, reject) => {
    try {
      const server = express()
      server.use(build.base, serveStatic(Path.resolve(dir)))
      const listener = server.listen(port, () => {
        const addr = listener.address()
        if (typeof addr !== 'object' || addr == null) {
          reject(Error('invalid address'))
          return
        }
        const result = {
          server,
          url: `http://${addr.address}:${addr.port}`
        }
        resolve(result)
      })
    } catch(error) {
      reject(error)
    }
  })
}
