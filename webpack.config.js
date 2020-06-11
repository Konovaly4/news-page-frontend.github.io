const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
  entry: {
    index: './src/index.js',
    userNews:  './src/userNews.js',
   },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
      rules: [{
              test: /\.js$/,
              use: { loader: "babel-loader" },
              exclude: /node_modules/
              },
              {
                test: /\.css$/i,
                use: [
                        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                        'css-loader',
                        'postcss-loader'
                    ]
              },
              {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                'file-loader?name=./images/[name].[ext]',
                {
                  loader: 'image-webpack-loader',
                  options: {},
                },
                ],
              },
              {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
              },
            ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
              preset: ['default'],
          },
          canPrint: true
        }),
        new HtmlWebpackPlugin({
          inject: false,
          template: './src/index.html',
          filename: 'index.html',
          chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
          inject: false,
          template: './src/user-news.html',
          filename: 'user-news.html',
          chunks: ['userNews'],
        }),
        new webpack.DefinePlugin({
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackMd5Hash()
        ]

  };