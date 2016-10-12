var webpack = require('webpack');
var path = require('path');

var PORT = process.env.PORT;
var API_PORT = process.env.API_PORT;

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://0.0.0.0:" + PORT,
    "webpack/hot/only-dev-server",
    path.join(__dirname, "..", "src", "app.jsx")
  ],
  output: {
    filename: "bundle.js",
    publicPath: "/"
  },
  devtool: "#eval-source-map",
  devServer: {
    colors: true,
    contentBase: path.join(__dirname, "..", "dist"),
    historyApiFallback: {
      index: "index.html"
    },
    hot: true,
    inline: false,
    progress: true,
    port: PORT,
    proxy: {
      "/api/": {
        target: "http://localhost:" + API_PORT,
        pathRewrite: {"^/api": ""}
      }
    },
    stats: "errors-only"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          "presets": ["es2015", "stage-0", "react"],
          "plugins": ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    root: [
      path.resolve('./src')
    ],
    extensions: ["", ".js", ".jsx"]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};