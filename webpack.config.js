const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './main.js',
    output: { path: './build', filename: 'app.js' },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        /*
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        */
        new ExtractTextPlugin('app.css', {
            allChunks: true
        })
    ],
    postcss: function () {
        return [precss, autoprefixer];
    }
};
