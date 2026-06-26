// Copies the AdminLTE 4 base stylesheet from the `admin-lte` npm package into the
// library's dist folder so consumers can `import '@adminlte/angular/css'`.
// Mirrors the Vue/React ports' build step. Strips the trailing sourceMappingURL
// comment (the .map isn't shipped) to avoid bundler warnings.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '../../..')

const pairs = [
  ['admin-lte/dist/css/adminlte.css', 'dist/adminlte-angular/css/adminlte.css'],
  ['admin-lte/dist/css/adminlte.rtl.css', 'dist/adminlte-angular/css/adminlte.rtl.css'],
]

for (const [from, to] of pairs) {
  const src = resolve(repoRoot, 'node_modules', from)
  const dest = resolve(repoRoot, to)
  let css
  try {
    css = readFileSync(src, 'utf8')
  } catch {
    console.warn(`[adminlte-angular] could not read ${from} — is admin-lte installed?`)
    continue
  }
  const stripped = css.replace(/\n?\/\*#\s*sourceMappingURL=.*?\*\/\s*$/, '\n')
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, stripped)
  console.log(`[adminlte-angular] copied ${from} -> ${to}`)
}
