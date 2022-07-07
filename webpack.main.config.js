module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  // externals: [
  //   {
  //     'utf-8-validate' : 'commonjs utf-8-validate',
  //     'bufferutil': 'commonjs bufferutil',
  //     'mock-aws-s3': 'commonjs mock-aws-s3',
  //     'aws-sdk': 'commonjs aws-sdk',
  //     'nock': 'commonjs nock',
  //     'pg-native': 'commonjs pg-native',
  //   }
  // ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
