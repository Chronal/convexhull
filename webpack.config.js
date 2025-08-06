const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

OUTDIR_JS = 'public/js';

CRATE_PATH = path.resolve(__dirname, '.');

module.exports = {
  entry: './index.js',
  mode: 'development',

  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname, OUTDIR_JS),
  },

  plugins: [
    new WasmPackPlugin({
      crateDirectory: CRATE_PATH,
      outName: 'chull_wasm',
    }),
  ],

  resolve: {
    modules: ['pkg', 'node_modules'],
  },

  experiments: {
    asyncWebAssembly: true,
  },
};
