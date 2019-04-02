import base from '../rollup.config'

export default [
  Object.assign(base, {
    input: 'src/slim/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'cjs'
    }
  }),
  Object.assign(base, {
    input: 'src/vslim/index.js',
    output: {
      file: 'dist/vslim-bundle.js',
      format: 'cjs'
    }
  }),
  Object.assign(base, {
    input: 'src/rslim/index.js',
    output: {
      file: 'dist/rslim-bundle.js',
      format: 'cjs'
    }
  })
]
