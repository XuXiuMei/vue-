'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const version = JSON.parse(fs.readFileSync('./package.json')).version;
console.log(version);
//chunkhash每次分析当前文件的数字签名，只要内容发生改变，数字签名就会改变


module.exports = {
    //指定入口
    entry: {
        vender: ['vue', 'vue-router', 'mint-ui', 'axios', 'moment', 'vue-preview'],
        main: './src/main.js'
    },
    output: {
        path:path.join(__dirname,'dist'),
        filename:'[name].[chunkhash].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            //单独分离css
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })

        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
        }, {
            test: /\.(jpg|ttf|svg|png|eot|woff2|woff|gif)$/,
            loader: 'url-loader?limit=4096' //依赖file-loader
        }, {
            test: /\.js$/,
            loader: 'babel-loader', //依赖babel-core
            //排除路径
            exclude: /node_modules/,
            options: {
                presets: ['es2015'], //将es6关键字转换成es5
                plugins: ['transform-runtime'] //es6函数转换
            }
        },
            //处理.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader' //vue-loader 依赖于vue-template-compiler
            },
            //处理未来生成到dist目录下才会报错的问题
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'], //将es6关键字转换成es5
                    plugins: ['transform-runtime'] //es6函数转换
                }
            }
        ]
    },
    plugins: [
        //压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //提取公共模块插件
        new webpack.optimize.CommonsChunkPlugin({
            //minifast虚拟清单文件,如果修改的只是main的部分，也会导致vender重新生成
            // minifast.js文件会每次都重新生成第三方包和main对应关系
            names: ['vender', 'minifast']
        }),


        //css分离插件
        // new ExtractTextPlugin("[name].css?v=" + version),
        new ExtractTextPlugin("style.[chunkhash].css"),
        new htmlWebpackPlugin({
            template: './src/index.html',
            //未来移动到dist目录下能够有Index.html文件
            //自动加上引入output中的filename

        }),
        //将jquery声明称全局的变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
    ],
    //让单文件的方式也能有template做组件的编译，包会增大30%
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.common.js'
    //     }
    // }
    // 开发环境中使用,webpack-dev-server,     生产环境代码命令:webpack
    devServer: { //webpack自动启动一个Node的服务器帮助你转发
        proxy: {
            '/v2/*': { //请求以/v2/xxxx开头
                target: 'https://api.douban.com/',
                //https://api.douban.com/v2/xxx做代理
                changeOrigin: true,
            }
        }

    }
}


//filename: '[name].js?v=' + version, //版本升级，一升全升，没有必要
// filename: '[name].[chunkhash].js', //出口的文件名称

if (process.argv.length === 5) {
    //webpack-dev-server启动的
    module.exports.output.filename = '[name].js';
} else { //webpack
    module.exports.output.filename = '[name].[chunkhash].js';
}
