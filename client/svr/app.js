// const path = require('path')
// const express = require('express')

// const app = express();

// const isDevelopment = process.env.NODE_ENV !== 'production';

// console.log('SHOULD NOT BE CALLED')
// if(isDevelopment) {

//     const webpack = require('webpack');
//     const WebpackDevServer = require('webpack-dev-server');
//     const webpackConfig = require('../../webpack.config.dev.js');
//     const compiler = webpack(webpackConfig);

//     const server = new WebpackDevServer(compiler, {
//         contentBase: '../public',
//         hot: true,
//         inline: true,
//         filename: 'main.js',
//         publicPath: '/',
//         stats: {
//             colors: true
//         }
//     });

//     server.listen(3000, () => {
//         console.log("Client Available at 3000");
//     });

//  }
