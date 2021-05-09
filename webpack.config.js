const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/frontend/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/frontend/index.html'),
      title: 'TO DO LIST'
    }),
    new MiniCssExtractPlugin(),
  ],

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude:/\.module.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.module.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'module',
                localIdentName: '[local]_[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
              }
            }
          },
          'sass-loader'],
      },
    ],
  },
}