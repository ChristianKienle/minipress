import { createApp } from './create-app'

export default async context => {
  const { app, router } = createApp(context)
  router.push(context.url)
  await new Promise((resolve, reject) => {
    router.onReady(resolve, reject)
  })
  return app
}
