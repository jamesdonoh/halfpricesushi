const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './main.js',
    output: { path: __dirname, filename: 'app.js' },
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
        new ExtractTextPlugin('app.css', {
            allChunks: true
        })
    ],
    postcss: function () {
        return [precss, autoprefixer];
    }
};
/*
    NB for production, with React inlined in the bundle, delete the 'externals'
       block above and remove the <script> tags from index.html

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
};
*/
