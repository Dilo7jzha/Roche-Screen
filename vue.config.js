const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/roche/jsq/dashboard',
  outputDir: 'dashboard',
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 80,
    open: true,
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: 'https://accelerator-member.roche.com.cn',
         target: 'https://test.saas.yuemia.com',
        //target: 'http://127.0.0.1:9302',
        // target: 'http://172.29.96.24:9302',
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false
})
