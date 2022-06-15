exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        externals: getConfig().externals.concat(({context, request}, callback) => {
          const regex = /^@?firebase(\/(.+))?/
          // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
          if (regex.test(request)) {
            return callback(null, `commonjs ${request}`) // <- use commonjs!
          }
          callback()
        }),
      })
    }
  }