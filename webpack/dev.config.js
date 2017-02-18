/* eslint-disable import/no-extraneous-dependencies, no-var, prefer-template */

var webpack = require('webpack');
var path = require('path');

var PORT = process.env.PORT;
var API_PORT = process.env.API_PORT;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:' + PORT,
    'webpack/hot/only-dev-server',
    path.resolve('frontend', 'app.jsx'),
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: '#eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    contentBase: path.resolve('public'),
    historyApiFallback: {
      index: 'index.html',
    },
    hot: true,
    inline: false,
    proxy: {
      '/api/': {
        target: 'http://localhost:' + API_PORT,
        pathRewrite: { '^/api': '' },
        changeOrigin: false,
        xfwd: true,
      },
    },
    stats: 'errors-only',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]', // TODO
          // 'css-loader?modules&importLoaders=1',
          'sass-loader',
        ],
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  resolve: {
    modules: [path.resolve('frontend'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
