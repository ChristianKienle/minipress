import { createApp } from './create-app'

export default async context => {
  const { app, router } = createApp()
  router.push(context.url)
  await new Promise((resolve, reject) => {
    router.onReady(resolve, reject)
  })
  if (context.res && router.currentRoute.name === '404') {
    context.res.statusCode = 404
  }
  return app
}