var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        app: './src/app/app.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less']
    },
    // debug: true,
    // devtool: 'cheap-source-map',
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets[]=es2015&presets[]=react&compact=false'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }, {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', "css-loader!stylus-loader")
            }, {
                test: /\.svg$/,
                loader: 'babel?presets[]=es2015,presets[]=react!svg2react'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[hash].[ext]'
            },
            {
                test: /\.(woff|eot|ttf)$/,
                loader: 'url-loader?name=fonts/[name].[ext]'

            }]
    },
    watch: true,
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            hash: true,
            chunks: ['app']
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};
