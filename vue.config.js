const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false
    },
    // 自己加的跨域尝试 可以用在开发环境 生产环境 nginx反代
    proxy: 'http://localhost:8002',//仅限开发环境
    host: '0.0.0.0',//仅限开发环境
    allowedHosts: [
      'yjzblog.site', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.yjzblog.site'   // .是二级域名的通配符   
    ], //仅限开发环境
    port: 8080, // 更改为你希望的端口//仅限开发环境
  },
})
