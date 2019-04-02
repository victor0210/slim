import base from '../rollup.config'
import uglify from 'rollup-plugin-uglify-es'
import alias from 'rollup-plugin-alias';
import path from 'path'

const injectPlugin = (conf, plugin) => {
    conf.plugins.push(plugin)
}

const merge = (base) => {
    // inject plugin for production
    injectPlugin(base, uglify())
    injectPlugin(base, alias({
          resolve: ['.jsx', '.js'],
          'slim-store': path.resolve(__dirname, '../src/slim/index')
      })
    )

    return [
        Object.assign(base, {
            input: 'src/rslim/index.js',
            output: [{
                file: 'dist/release/rslim/rslim-cjs.js',
                exports: 'named',
                format: 'cjs'
            }, {
                file: 'dist/release/rslim/rslim-esm.js',
                exports: 'named',
                format: 'esm'
            }, {
                file: 'dist/release/rslim/rslim-amd.js',
                exports: 'named',
                format: 'amd'
            }, {
                file: `dist/release/rslim/rslim.min.js`,
                exports: 'named',
                name: 'rslim',
                format: 'iife',
            }]
        })
    ]
}

export default merge(base)
