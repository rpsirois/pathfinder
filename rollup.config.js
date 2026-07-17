import {builtinModules} from 'module'
import rpi_jsy from 'rollup-plugin-jsy'


const _rpis_ = (defines, ...args) => [
  rpi_jsy({defines}),
  ...args]


const _cfg_ = {
  external: id => (
       /^\w*:/.test(id)
    || builtinModules.includes(id)
    ),
  plugins: _rpis_({}) }


export default [
  ... add_jsy('index'),
  ... add_jsy('test_astar'),
  ... add_jsy('test_astar_edges'),
]


function * add_jsy(src_name, opt={}) {
  const input = `code/${src_name}${opt.ext || '.jsy'}`

  yield { ..._cfg_, input, output: [
      { file: `esm/${src_name}.js`, format: 'es', sourcemap: true, ...opt },
    ]}
}
