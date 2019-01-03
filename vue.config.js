module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js'
    }
  }
  // chainWebpack: config => {
  //   config.module
  //     .rule('js')
  //     .include
  //     .add(/packages/)
  //     .end()
  //     .use('babel')
  //     .loader('babel-loader')
  //     .tap(options => {
  //       return options
  //     })
  // }
}
