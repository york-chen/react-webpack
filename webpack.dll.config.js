const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        vendor1: ['react', 'react-dom', 'react-router', 'reflux', 'react-mixin']
        // vendor2: ['saltui', 'salt-icon/dist/Symbol']
        // vendor3: ['iscroll/build/iscroll-probe', 'pubsub-js/src/pubsub'],
        // vendor4: ['echarts'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "dll/[name].[chunkHash].dll.js",
        library: "[name]_[chunkHash]",
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')//告诉react全家桶,目前是生产环境,不必要的代码就省略掉
        }),
        new CleanWebpackPlugin(
            ['dist/dll/*.*', 'vendor*-manifest.json', 'dist/template.html'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.DllPlugin({
            path: path.join(__dirname, "[name]-manifest.json"),
            name: "[name]_[chunkHash]"
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new HtmlWebpackPlugin({
            title: '东风商旅',
            filename: 'template.html',
            template: './index.html',
            inject: 'body'
        }),
    ]
};