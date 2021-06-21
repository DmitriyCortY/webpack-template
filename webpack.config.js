const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack')

const Handlebars = require('./handlebars')

const fs = require('fs')
function getFilesNameFromPath(_path, extension) {
    let files = fs.readdirSync( _path );
    return files.filter( file => file.match(new RegExp(`.*\.(${extension})`, 'ig')));
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const pages = /*[
    'index',
    'blog'
]*/getFilesNameFromPath("./src", ".html")

const HtmlWebpackPluginMultiplePages = pages.map(name => {
    return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `src/${name}`),
        filename: `${name}`,
        minify: isProd
    })
})

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
    return config
}

const plugins = () => {
    const basePlugins = [
        ...HtmlWebpackPluginMultiplePages,
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./assets/css/${filename('css')}`
        })
    ]

    if(isProd) {
        basePlugins.push(
            new ImageminPlugin({
                bail: false,
                cache: true,
                imageminOptions: {
                    plugins: [
                        ["gifsicle", { interlaced: true }],
                        ["jpegtran", { progressive: true }],
                        ["optipng", { optimizationLevel: 5 }],
                        [
                            "svgo",
                            {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    }
                                ]
                            }
                        ]
                    ]
                }
            })
        )
    }

    return basePlugins
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: '../index.js',
    output: {
        filename: `./assets/js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    devtool: 'source-map',
    optimization: optimization(),
    plugins: plugins(),
    module: {
        rules: [
            // html
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    esModule: true,
                    preprocessor: async (content) => {
                        return await Handlebars.convert(content)
                    }
                }
            },
            // css
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        },
                    },
                    'css-loader'
                ],
            },
            // scss
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            // image
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/img/',
                            name: filename('[ext]')
                        }
                    }
                ],
            },
            // font
            {
                test: /\.(?:|woff2|woff|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/font/',
                            name: filename('[ext]')
                        }
                    }
                ]
            },
            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // video
            {
                test: /\.mp4$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: './assets/video/',
                        name: filename('[ext]')
                    }
                }
            }
        ],
    }
}