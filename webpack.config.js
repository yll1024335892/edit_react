const path = require('path');
const webpack= require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/dist/',
        filename: 'js/app.js'
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
          {//react的jsx处理
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          },
          { 
            test: /\.tsx?$/, 
            loader: "awesome-typescript-loader" 
          },
          {//css文件处理
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
          {//sass文件处理
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ['css-loader','sass-loader']
            })
          },
          {//图片资源的加载
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name:'resource/[name].[ext]'
                },
              },
            ],
          }
          //处理字体文件
        ]
      },
    plugins: [
      //处理html文件
      new HtmlWebpackPlugin({
        template:'./src/index.html'
    }),
    //独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块
    // new webpack.optimize.CommonsChunkPlugin({
    //     name:'common',
    //     filename:'js/base.js'
    // }),
    
  ],
    optimization: {
       splitChunks: {
         name: 'common',
         filename:'js/base.js'
       }
    },
    devServer: {
      //  contentBase: './dist'
    },
};