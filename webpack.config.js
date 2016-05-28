const webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: { path: __dirname, filename: 'app.js' },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
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
