const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false
    },
    // 自己加的跨域尝试 可以用在开发环境 生产环境 nginx反代
    proxy: 'http://localhost:8002'
  },
})
