const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        server: './index.js',
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'main.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.ejs$/,
                use: [
                    // 'html-loader',
                    {
                        loader: "ejs-webpack-loader",
                        options: {
                            htmlmin: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './view/pages/index.ejs',
        })
    ]
}
