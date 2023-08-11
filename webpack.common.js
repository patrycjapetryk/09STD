const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.js',
    slider: './src/js/slider.js',
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: __dirname + '/dist/',
    assetModuleFilename: 'images/[name].[hash:8][ext][query]',
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-gallery-src',
                type: 'src',
              },
              {
                tag: 'source',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'video',
                attribute: 'poster',
                type: 'src',
              },
            ],
          },
          minimize: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext][query]',
        },
      },
      {
        test: /\.mp4|webm$/i,
        type: 'asset/resource',
        generator: {
          filename: 'video/[name].[hash:8][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/data',
          to: 'data',
          globOptions: {
            ignore: ['**/*.DS_Store'],
          },
        },
        {
          from: './src/assets/images',
          to: 'images',
          globOptions: {
            ignore: ['**/*.DS_Store'],
          },
        },
        {
          from: './src/assets/video',
          to: 'video',
          globOptions: {
            ignore: ['**/*.DS_Store'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.pug',
      inject: 'body',
      chunks: ['index', 'slider'],
      filename: 'index.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/content-creation.pug',
      inject: true,
      chunks: ['index'],
      filename: 'content-creation.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contact.pug',
      inject: true,
      chunks: ['index'],
      filename: 'contact.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/project.pug',
      inject: true,
      chunks: ['index'],
      filename: 'project.html',
      minify: false,
    }),
  ],
};
