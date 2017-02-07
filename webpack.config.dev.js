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
        'webpack-dev-server/client?http://localhost:8080/', 
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'client'),
        publicPath: 'http://localhost:8080/',
        filename: 'main.js'
    },
    watch: true,
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: path.join(__dirname),
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
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'index.html'),
            title: 'Project',
            inject: false 
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
