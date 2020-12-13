import rpi_resolve from '@rollup/plugin-node-resolve'
import rpi_json from '@rollup/plugin-json'
import rpi_jsy from 'rollup-plugin-jsy-lite'

const configs = []
export default configs

const sourcemap = true
const external = []
const plugins = [
    rpi_jsy(),
    rpi_json(),
    rpi_resolve(),
]

add_jsy('test_astar')
add_jsy('test_goap')

function add_jsy(src_name, module_name) {
  if (!module_name) module_name = src_name

  configs.push({
    input: `code/${src_name}.jsy`,
    output: { file: `dist/${src_name}.cjs`, format: 'cjs', exports:'named', sourcemap },
    plugins, external })
}
