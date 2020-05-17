/* eslint-env node */
/*eslint @typescript-eslint/no-var-requires:0*/
const path = require('path');

const serviceConfig = {
  devtool: 'source-map',
  entry: path.join(__dirname, './src/feature-service.ts'),
  externals: {
    '@feature-hub/core': '@feature-hub/core',
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {loader: 'ts-loader'},
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
};

module.exports = serviceConfig;
