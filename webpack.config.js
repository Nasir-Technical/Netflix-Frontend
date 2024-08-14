// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'build'),  // Ensure this matches your deployment directory
//   },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'build'),  // This should match the output path
//     },
//     historyApiFallback: true,
//     compress: true,
//     port: 5173,
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: 'babel-loader',
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
// };
