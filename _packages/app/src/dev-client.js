import client from 'webpack-hot-middleware/client'
export const createDevClient = () => {
  client.subscribe(() => {})
}
