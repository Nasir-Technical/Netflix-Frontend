const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Update entry point to the React app
  output: {
    path: path.resolve(__dirname, 'build'), // Ensure the output directory exists
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // CSS files ko process karega
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to the public/index.html
    }),
  ],
};
