import { createApp } from './index'

export default async context => {
  const { app, router } = createApp()
  router.push(context.url)

  await new Promise((resolve, reject) => {
    router.onReady(resolve, reject)
  })

  if (context.res && router.currentRoute.name === '404') {
    context.res.statusCode = 404
  }

  // context.meta = app.$meta()

  return app
}
