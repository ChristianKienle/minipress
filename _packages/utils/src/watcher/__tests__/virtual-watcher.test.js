// @ts-check
const createWatcher = require('./../virtual-watcher')

describe('virtual watcher', () => {
  it('works', done => {
    expect.assertions(1)
    const watchedFile = '/hello/world.md'
    const watcher = createWatcher()
    const events = []
    watcher.on((event, path) => {
      events.push({ event, path })
      if(events.length === 3) {
        expect(events).toMatchObject([
          { event: 'added', path: watchedFile },
          { event: 'changed', path: watchedFile },
          { event: 'removed', path: watchedFile },
        ])
        done()
      }
    })
    watcher.addFile('/hello/world.md')
    watcher.changeFile('/hello/world.md')
    watcher.removeFile('/hello/world.md')
  })
})