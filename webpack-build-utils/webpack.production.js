const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: './index.css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin(),
      // new HtmlWebpackPlugin({
      //   template: './src/index.html',
      //   minify: {
      //     removeAttributeQuotes: true,
      //     collapseWhitespace: true,
      //     removeComments: true,
      //   },
      // }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
