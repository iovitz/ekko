const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/app.ts'],
  target: 'node',
  output: {
    clean: true,
    path: `${__dirname}/build`,
    libraryTarget: 'commonjs',
    filename: './app.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [new NodePolyfillPlugin()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
