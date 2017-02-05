const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')
const nodeExternals = require('webpack-node-externals');

function getEntry() {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    if (process.env.NODE_ENV == 'production') {
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

function getPlugin() {
    if (process.env.NODE_ENV == 'production') {
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
            warnings: false
            }
        }) 
    } 
    return new webpack.HotModuleReplacementPlugin(),
           new HtmlWebpackPlugin({
              template: 'index.ejs',
              title: 'Project'
           })
}

function getDevTool() {
    if (process.env.NODE_ENV == 'production') {
        return 'source-map'
    } 
    return 'eval-source-map'
}

module.exports = {
    context: path.resolve(__dirname, 'client/src'),
    devtool: getDevTool(),
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
                exclude: /node_modules/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.json/,
                exclude: /node_modules/,
                loaders: ["json-loader"]
            },
        ]
    },
    plugins: [
        getPlugin()
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
