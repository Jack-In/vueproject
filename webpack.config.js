const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry:'./src/app.js',
  devServer: {
    contentBase: './dist'
  },
  output:{
    filename:'build.js',
    path:path.resolve(__dirname,'./dist')
  },
  module: {
    rules: [
      {
          test: /vue-preview.src.*?js$/,
          use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader'
        ]//加载时，从右到左加载
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'less-loader'
        ]//加载时，从右到左加载
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader'
        ]//加载时，从右到左加载
      },
      {
        test: /\.(png|gif|jpg|eot|svg|ttf|woff|otf)/,
        // use:['url-loader'] //可以简写'url?limit=20000'  单位是字节
        use: [
          {
            loader:'url-loader',
            options:{
              limit: 1024,
              fallback: 'file-loader'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.vue$/,
        use:['vue-loader']
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist']),//数组内可以放置多个要删除的目录
    new htmlWebpackPlugin({
        title: '页面标题',  //生成页面标题
        filename: 'index.html',//生成的文件名
        template: 'index.html'//可以设置任意文件名和扩展名
    })
 ]
}