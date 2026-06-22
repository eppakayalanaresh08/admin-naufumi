import { createReadStream } from 'node:fs'
import { access, readdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const root = process.cwd()
const distDir = resolve(root, 'dist')
const assetsDir = resolve(distDir, 'assets')
const indexFile = resolve(distDir, 'index.html')
const host = '127.0.0.1'
const port = Number(process.env.PORT || 5173)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

async function assertDistReady() {
  await access(indexFile, constants.R_OK)
  await access(assetsDir, constants.R_OK)

  const assetNames = await readdir(assetsDir)
  const hasJsBundle = assetNames.some((name) => name.endsWith('.js'))
  const hasCssBundle = assetNames.some((name) => name.endsWith('.css'))

  if (!hasJsBundle || !hasCssBundle) {
    throw new Error('dist/assets is missing the expected JS or CSS bundle')
  }
}

function safePathFromUrl(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0])
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  const filePath = pathname === '/' ? indexFile : resolve(distDir, `.${normalized}`)

  if (!filePath.startsWith(distDir)) {
    return null
  }

  return filePath
}

function sendFile(res, filePath) {
  const ext = extname(filePath)
  const contentType = contentTypes[ext] || 'application/octet-stream'
  res.writeHead(200, { 'Content-Type': contentType })
  createReadStream(filePath)
    .on('error', () => {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not found')
    })
    .pipe(res)
}

async function main() {
  await assertDistReady()

  const server = createServer(async (req, res) => {
    const filePath = safePathFromUrl(req.url || '/')

    if (!filePath) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Forbidden')
      return
    }

    try {
      await access(filePath, constants.R_OK)
      sendFile(res, filePath)
      return
    } catch {
      sendFile(res, indexFile)
    }
  })

  server.listen(port, host, () => {
    console.log(`Static dev server running at http://${host}:${port}/`)
  })
}

main().catch((error) => {
  console.error('Dev server failed:', error.message)
  process.exit(1)
})
