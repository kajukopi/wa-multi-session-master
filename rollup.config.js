const typescript = require('@rollup/plugin-typescript')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs' // or 'esm' for ES modules
  },
  plugins: [typescript(), nodeResolve()],
  external: [] // List dependencies here that shouldn't be bundled
};
