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
            input: 'src/index.js',
            output: [{
                file: `dist/release/slim/slim-cjs.js`,
                format: 'cjs'
            }, {
                file: `dist/release/slim/slim-esm.js`,
                format: 'esm'
            }, {
                file: `dist/release/slim/slim-amd.js`,
                format: 'amd'
            }, {
                file: `dist/release/slim/slim.min.js`,
                name: 'slim',
                format: 'iife',
            }]
        })
    ]
}

export default merge(base)
