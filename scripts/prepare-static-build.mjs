import { access, readdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const distDir = resolve(root, 'dist')
const assetsDir = resolve(distDir, 'assets')
const indexFile = resolve(distDir, 'index.html')

async function assertReadable(path) {
  await access(path, constants.R_OK)
}

async function main() {
  await assertReadable(indexFile)
  await assertReadable(assetsDir)

  const assetNames = await readdir(assetsDir)
  const hasJsBundle = assetNames.some((name) => name.endsWith('.js'))
  const hasCssBundle = assetNames.some((name) => name.endsWith('.css'))

  if (!hasJsBundle || !hasCssBundle) {
    throw new Error('dist/assets is missing the expected JS or CSS bundle')
  }

  console.log('Static build ready: using committed dist/ output')
}

main().catch((error) => {
  console.error('Build failed:', error.message)
  process.exit(1)
})
