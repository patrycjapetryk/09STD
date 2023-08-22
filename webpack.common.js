const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/ts/index.ts',
    slider: './src/ts/slider.ts',
    page: './src/ts/page.ts',
    project: './src/ts/project.ts',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: __dirname + '/dist/',
    assetModuleFilename: 'images/[name].[hash:8][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
        // {
        //   from: './src/assets/video',
        //   to: 'video',
        //   globOptions: {
        //     ignore: ['**/*.DS_Store'],
        //   },
        // },
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
      template: './src/pages/public-relations-and-events/index.pug',
      inject: true,
      chunks: ['index', 'page'],
      filename: 'public-relations-and-events/index.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/influencers/index.pug',
      inject: true,
      chunks: ['index', 'page'],
      filename: 'influencers/index.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/graphic-design/index.pug',
      inject: true,
      chunks: ['index', 'page'],
      filename: 'graphic-design/index.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/social-media/index.pug',
      inject: true,
      chunks: ['index', 'page'],
      filename: 'social-media/index.html',
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
      template: './src/pages/graphic-design/project/index.pug',
      inject: true,
      chunks: ['index', 'project'],
      filename: 'graphic-design/project/index.html',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/public-relations-and-events/project/index.pug',
      inject: true,
      chunks: ['index', 'project'],
      filename: 'public-relations-and-events/project/index.html',
      minify: false,
    }),
  ],
};
