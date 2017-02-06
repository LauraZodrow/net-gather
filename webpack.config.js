const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')
const nodeExternals = require('webpack-node-externals');

function getEntry() {
    if (process.env.NODE_ENV == 'production') {
         return { path: './index.js' }
    } 
    return [ 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000/', 'webpack/hot/only-dev-server', './index.js']
}

function getOutput() {
    if (process.env.NODE_ENV == 'production') {
         return {  path: path.resolve(__dirname, 'public'), publicPath: '/', filename: 'main.js' }
    }
    return {
        path: path.resolve(__dirname, 'client/public'),
        publicPath: 'http://localhost:3000/',
        filename: 'main.js'
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
    return new webpack.HotModuleReplacementPlugin()
    
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
        getPlugin(),
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
