import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { join } from 'path';

export default merge(common, {
  devtool: 'source-map',
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    static: {
      directory: join(__dirname, 'dist'),
    },
    port: 8090,
    open: true,
    host: '0.0.0.0',
    liveReload: true,
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
    },
  },
});
