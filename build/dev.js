import base from '../rollup.config'

export default [
  Object.assign(base, {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'cjs'
    }
  }),
  Object.assign(base, {
    input: 'src/vslim.js',
    output: {
      file: 'dist/vslim-bundle.js',
      format: 'cjs'
    }
  })
]
