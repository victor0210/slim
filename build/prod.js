import base from '../rollup.config'
import {uglify} from 'rollup-plugin-uglify'

const injectPlugin = (conf, plugin) => {
  conf.plugins.push(plugin)
}

const merge = (base) => {
  // inject plugin for production
  injectPlugin(base, uglify())

  return Object.assign(base, {
    input: 'src/index.js',
    output: [{
      file: 'dist/release/simple-cjs.js',
      format: 'cjs'
    }, {
      file: 'dist/release/simple-esm.js',
      format: 'esm'
    }, {
      file: 'dist/release/simple-amd.js',
      format: 'amd'
    }]
  })
}

export default merge(base)
