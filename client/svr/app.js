const path = require('path')
const express = require('express')

const app = express();

const isDevelopment = process.env.NODE_ENV !== 'production';

if(isDevelopment) {

    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const webpackConfig = require('../../webpack.config.js');
    const compiler = webpack(webpackConfig);

    const server = new WebpackDevServer(compiler, {
        contentBase: '../public',
        hot: true,
        inline: true,
        filename: 'bundle.js',
        publicPath: '/',
        stats: {
            colors: true
        }
    });

    server.listen(3000, () => {
        console.log("Client Available at 3000");
    });

 }
