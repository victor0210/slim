import base from '../rollup.config'
import uglify from 'rollup-plugin-uglify-es'

const injectPlugin = (conf, plugin) => {
    conf.plugins.push(plugin)
}

const merge = (base) => {
    // inject plugin for production
    injectPlugin(base, uglify())

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
