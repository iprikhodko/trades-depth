const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [{
      test: /.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
        },
      },
      include: [
        path.resolve(__dirname, 'src'),
      ],
    }, {
      test: /.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules/bootstrap/scss'],
          },
        }],
      }),
    }],
  },
  resolve: {
    alias: {
      client: path.resolve(__dirname, './src'),
      lib: path.resolve(__dirname, './src/lib'),
      styles: path.resolve(__dirname, './src/styles'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/templates/index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
