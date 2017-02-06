const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
    context: path.resolve(__dirname, 'client/src'),
    devtool: 'eval-source-map',
    entry: [ 
        'react-hot-loader/patch', 
        'webpack-dev-server/client?http://localhost:3000/', 
        'webpack/hot/only-dev-server', 
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'client/public'),
        publicPath: 'http://localhost:3000/',
        filename: 'main.js'
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1', "babel-preset-react"],
                    plugins: [ "react-hot-loader/babel"],
                }
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico)$/,
				exclude: /node_modules/,
				loader:'file-loader?name=img/[path][name].[ext]&context=./assets/img'
			},
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.json/,
                exclude: /node_modules/,
                loaders: ["json-loader"]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'index.html'),
            title: 'Project'
        }),
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src')
        ],
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
    }
}
