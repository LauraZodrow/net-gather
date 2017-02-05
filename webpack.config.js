const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')
const nodeExternals = require('webpack-node-externals');

function getEntry() {
    if (process.env.NODE_ENV === 'production') {
         return { path: './index.js' }
    } 
    return [ 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000/', 'webpack/hot/only-dev-server', './index.js']
}

function getOutput() {
    if (process.env.NODE_ENV !== 'production') {
         return {  path: path.resolve(__dirname, 'public'), publicPath: '/', filename: '[name].js' }
    }
    return {
        path: path.resolve(__dirname, 'client/public'),
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.js'
    }
}

module.exports = {
    context: path.resolve(__dirname, 'client/src'),
    devtool: 'eval-source-map',
    entry: getEntry(),
    output: getOutput(),
    externals: [nodeExternals()],
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
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.json/,
                loaders: ["json-loader"]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
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
