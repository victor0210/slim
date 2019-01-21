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
                format: 'cjs'
            }, {
                file: 'dist/release/vslim/vslim-esm.js',
                format: 'esm'
            }, {
                file: 'dist/release/vslim/vslim-amd.js',
                format: 'amd'
            }, {
                file: `dist/release/vslim/vslim.min.js`,
                name: 'vslim',
                format: 'iife',
            }]
        })
    ]
}

export default merge(base)
