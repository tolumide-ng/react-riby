const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss'],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$|.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
    ],
  },
};
