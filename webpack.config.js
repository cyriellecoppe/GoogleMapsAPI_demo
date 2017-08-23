'use strict'

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const bootstrapPath = path.join(__dirname, 'node_modules/bootstrap')


module.exports = {
    entry: [path.resolve(srcPath, 'app.js')],
    output: {
        filename: 'main.js',
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    bootstrapPath,
                    path.join(__dirname, 'node_modules/jquery'),
                    srcPath,
                ],
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(jpg|png|gif|eot|woff|ttf|svg)$/,
                include: [
                    path.join(srcPath, 'images'),
                    path.join(__dirname, 'node_modules/slick-carousel')
                ],
                use: [{
                    loader: 'url-loader',
                    options: {limit: 25000},
                }],
            },
            {
                test: /\.s?css$/,
                include: [
                    bootstrapPath,
                    srcPath,
                    path.join(__dirname, 'node_modules/slick-carousel')
                ],
                use: ExtractTextPlugin.extract({use: [
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ]}),
            },
        ],
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new ExtractTextPlugin('main.[contenthash].css'),
        new HtmlWebpackPlugin({
            title: 'AroundMe',
            template: path.join(srcPath, 'index.html'),
            hasj: true,
            favicon: path.join(srcPath, 'images/globe.ico'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Tether: 'tether'
        }),
        new CompressionPlugin({
            test: /\.(js|html|css)$/,
        })
    ],
    stats: "verbose",
}
