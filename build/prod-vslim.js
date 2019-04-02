import base from '../rollup.config'
import uglify from 'rollup-plugin-uglify-es'
import alias from 'rollup-plugin-alias'
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
            input: 'src/vslim/index.js',
            output: [{
                file: 'dist/release/vslim/vslim-cjs.js',
                exports: 'named',
                format: 'cjs'
            }, {
                file: 'dist/release/vslim/vslim-esm.js',
                exports: 'named',
                format: 'esm'
            }, {
                file: 'dist/release/vslim/vslim-amd.js',
                exports: 'named',
                format: 'amd'
            }, {
                file: `dist/release/vslim/vslim.min.js`,
                exports: 'named',
                globals: 'slim',
                name: 'vslim',
                format: 'iife',
            }]
        })
    ]
}

export default merge(base)
