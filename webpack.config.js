const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "./scripts/main.ts")
    },
    devtool: 'inline-source-map',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "public"),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|svg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]

            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".less"]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "base.css"
        })
    ],

    watchOptions: {
        ignored: 'node_modules/**'
    },
};





// const path = require('path')
// const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals')
// const HtmlWebPackPlugin = require("html-webpack-plugin")
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
// module.exports = {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     entry: {
//         server: './index.js',
//     },
//     output: {
//         path: path.join(__dirname, 'public'),
//         publicPath: '/',
//         filename: 'main.js'
//     },
//     target: 'node',
//     node: {
//         __dirname: false,
//         __filename: false,
//     },
//     externals: [nodeExternals()],
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader"
//                 }
//             },
//             {
//                 test: /\.ejs$/,
//                 use: [
//                     // 'html-loader',
//                     {
//                         loader: "ejs-webpack-loader",
//                         options: {
//                             htmlmin: true
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     'css-loader',
//                     'postcss-loader'
//                 ],
//             }
//         ]
//     },
//     plugins: [
//         new MiniCssExtractPlugin({filename: 'style.css'}),
//         new CleanWebpackPlugin(),
//         // new HtmlWebPackPlugin({
//         //     filename: 'index.html',
//         //     inject: true,
//         //     template: './view/pages/index.ejs',
//         // })
//     ]
// }
