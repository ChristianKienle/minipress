/**
 * @param {{options: object}} args
 */
module.exports = async ({ options }) => {
  const { invoked = () => ({}) } = options
  invoked()
  return {

  }
}
