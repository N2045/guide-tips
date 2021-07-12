const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        "guide-tips": path.resolve(process.cwd(), 'index.js'),
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(process.cwd(), 'dist'),
        clean: true,
        library: "GuideTips",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ],
    },
};