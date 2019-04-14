const webpack = require('webpack');
module.exports = {
  devServer: {
    port: 8661,
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  },
  // baseUrl: '/static/',
}