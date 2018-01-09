const path = require('path')
const webpack = require('webpack')

module.exports = {
  bail: false,
  entry: './src',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9001
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './public/code'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.rs$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  compact: true,
                }
              },
              {
                loader: 'rust-native-wasm-loader',
                options: {
                  gc: true,
                  release: true,
                  cargoWeb: true,
                  name: 'static/wasm/[name].[hash:8].wasm'
                }
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
