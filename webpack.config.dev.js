import * as path from 'path';
import * as webpackConfigGhPages from './webpack.config.gh-pages.js';

export {
  webpackConfigGhPages,
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    static: './src/',
    compress: true,
    port: 9000
  },
  mode: 'development',
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, '.dev-server'),
    libraryTarget: 'umd',
  },
};
