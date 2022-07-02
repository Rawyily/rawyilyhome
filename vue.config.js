//vue 路由刷新出新 Uncaught SyntaxError: Unexpected token ‘＜‘
const path = require('path') // 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir) // path.join(_dirname)设置绝对路径
}
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      // 第一个参数：别名 第二个参数：路径
      
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
      .set('utils', resolve('src/utils'))
      .set('commonjs', resolve('src/commonjs'))
      .set('network', resolve('src/network'))
  },
  //  将原来的 publicPath: './'，改成
  publicPath: '/'
  // 这样便可以解决路由刷新出新 Uncaught SyntaxError: Unexpected token '<'

  // publicPath: "./",
  // configureWebpack: {
  // resolve: {
  //   alias: {
  //   'assets': '@/assets',
  //   'components': '@/components',
  //   'router': '@/router',
  //   'store': '@/store',
  //   'views': '@/views',
  //   'utils': '@/utils',
  //   'network':'@/network'
  //    }
  // }
  // }
};
