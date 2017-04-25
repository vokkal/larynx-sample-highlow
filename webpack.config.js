let path = require('path');
let webpack = require('webpack');
let ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'larynx_bundle.js',
        libraryTarget: 'commonjs',
        umdNamedDefine: false
    },
    externals: {
        "aws-sdk": "aws-sdk"
    },
    devtool: 'source-map',
    target: 'node',
    plugins: [
        new ZipPlugin({
            fileOptions: {
                mtime: new Date(),
                mode: 0o100664,
                compress: true,
                forceZip64Format: false,
            },
            pathPrefix: './',
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: /node_modules/,
            }
        ]
    }
};