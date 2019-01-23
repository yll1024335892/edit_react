# webpack和react的环境的基础配置
> html的压缩压缩文件，通过插件HtmlWebpackPlugin来进行处理

1. 通过控制台cd进入webpack.config.js的所在的目录下
2. yarn add html-webpack-plugin下载
3. node_modules文件夹下就看到了html-webpack-plugin的目录
4. 在webpack.config.js中去引入插件const HtmlWebpackPlugin = require('html-webpack-plugin');
5. 实例化插件
 ```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [new HtmlWebpackPlugin()]
};
 ```
 > webpack的项目的一个搭建处理

 ```
 全局安装下webpack，npm install webpack@版本号  -g
1，建立一个文件夹
2，cd到文件夹中
3，npm init初始化获取一个package.json的文件
4，将webpack安装到目录中来 npm install webpack
5，新建一个文件webpack.config.js这个是webpack的配置文件
    const path = require('path');
    module.exports = {
    entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        }
    };
6，建立文件夹src并建立一个文件app.js
7，通过运行webpack就会自动给编译出数据了
 ```
 > webpack的配置（需要进一步去完善处理下）
## 配置babel-loader加载jsx的文件
```
npm install -D babel-loader @babel/core @babel/preset-env webpack
//rules中的配置，将js后缀命名为jsx
 {//react的jsx处理
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          }
```
## 配置加载css文件style-loader
```
npm install style-loader --save-dev   或者yarn add style-loader
 //通过require去引入
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 //rules的配置处理
 {//css文件处理
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          }
```
##  插件extract-text-webpack-plugin的配置，将单独的css文件编译到指定目录中，自动加入到html的模板中来yarn add  extract-text-webpack-plugin@next
### sass的解析器(loader)
```
//需要安装sass-loader的依赖库
  {//sass文件处理
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ['css-loader','sass-loader']
            })
          }
```
##  加载图片(loader)file-loader
```
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

```
##  加载fonts字体和其它资源从这里进去asset-management得向导为入口进入即可

##  文件统一的压缩处理：原有的方法给移除掉了，现在用新的方法   
```
optimization: {
       splitChunks: {
         name: 'common',
         filename:'js/base.js'
       }
    }
```

#### webpack-dev-server提供了一个简单的web服务器，并且能够实时重新加载live reloading通过npm install webpack-dev-server -g然后通过webpack-dev-server去启动本地的web服务器，然后启动操作

