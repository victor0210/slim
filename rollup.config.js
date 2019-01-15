import babel from 'rollup-plugin-babel'
import ts from 'rollup-plugin-typescript'

export default {
  plugins: [
    ts({
      include: 'src/**'
    }),
    babel({
      include: 'src/**'
    })
  ]
}
