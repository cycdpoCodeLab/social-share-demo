﻿const
  path = require('path')
  , webpackMerge = require('webpack-merge')
  , webpackBase = require("./webpack.base.js")
  , browserSyncConfig = require('./browserSync.config')
  , styleLoadersConfig = require('./styleLoaders.config')()

  // Webpack Plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
;

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  devtool: 'eval-source-map',

  output: {
    path: path.resolve('dist'),
  },

  module: {
    rules: [
      // Style
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          styleLoadersConfig.cssLoader,
          styleLoadersConfig.sassLoader,
        ]
      },

      // Pictures
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },

      // media
      {
        test: /\.(wav|mp3|mpeg|mp4|webm|ogv|flv|ts)$/i,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('static', 'media'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[ext]',
            },
          },
        ],
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false,
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('static', 'view', 'index.pug'),
      favicon: path.resolve('static', 'favicon.ico'),
      //filename: '../index.html',
    }),

    new BrowserSyncPlugin(browserSyncConfig({
      server: {
        baseDir: 'dist',
      },
    }), {
      reload: true,
    }),

  ],
});