const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),  // Ensure this matches your deployment directory
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),  // This should match the output path
    },
    historyApiFallback: true,  // This line is crucial for React Router
    compress: true,
    port: 5173, // Ensure this matches the port in the error
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
