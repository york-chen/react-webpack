const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: '[name].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })

            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            }, {
                test: /\.svg$/,
                use: ['babel-loader', 'svg2react-loader']
            }, {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader?name=images/[hash].[ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf)$/,
                use: {
                    loader: 'url-loader?name=fonts/[name].[ext]'
                }
            }
        ]
    },
    watch: true,
    devtool: 'cheap-source-map',
    plugins: [
        new ExtractTextPlugin("app.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')//告诉react全家桶,目前是生产环境,不必要的代码就省略掉
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname),
            manifest: require("./vendor1-manifest.json"),
        }),
        new HtmlWebpackPlugin({
            title: '东风商旅',
            filename: 'index.html',
            chunks: ['app'],
            chunksSortMode: "manual",
            template: 'dist/template.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(
            ['dist/*.js', 'dist/*.css', 'dist/index.html'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        )
    ]
};