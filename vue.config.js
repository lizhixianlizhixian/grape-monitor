const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      if (!options.patterns[0].globOptions) {
        options.patterns[0].globOptions = {}
      }
      if (!options.patterns[0].globOptions.ignore) {
        options.patterns[0].globOptions.ignore = []
      }
      options.patterns[0].globOptions.ignore.push('**/index.html')
      return [options]
    })
  },
  devServer: {
    proxy: {
      '/api/geo': {
        target: 'https://geoapi.qweather.com',
        changeOrigin: true,
        pathRewrite: { '^/api/geo': '' }
      },
      '/api/weather': {
        target: 'https://devapi.qweather.com',
        changeOrigin: true,
        pathRewrite: { '^/api/weather': '' }
      }
    }
  }
})