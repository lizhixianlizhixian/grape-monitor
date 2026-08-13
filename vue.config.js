const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
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