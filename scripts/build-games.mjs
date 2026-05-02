import { execSync } from 'child_process'
import { mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const gamesOut = resolve(root, 'public', 'games')

mkdirSync(gamesOut, { recursive: true })

const ALL_GAMES = [
  { name: 'hannnibal',     dir: 'games/hannnibal/hannibal-solo' },
  { name: 'manilla',       dir: 'games/manilla/frontend' },
  { name: 'pandemic_rome', dir: 'games/pandemic_rome' },
]

// 引数でゲーム名を指定すると単体ビルド（例: node build-games.mjs pandemic_rome）
const filter = process.argv[2]
const games = filter ? ALL_GAMES.filter(g => g.name === filter) : ALL_GAMES

if (filter && games.length === 0) {
  console.error(`Unknown game: ${filter}`)
  console.error(`Available: ${ALL_GAMES.map(g => g.name).join(', ')}`)
  process.exit(1)
}

for (const { name, dir } of games) {
  console.log(`\n=== Building ${name} ===`)
  const cwd = resolve(root, dir)
  const outDir = resolve(gamesOut, name)

  execSync('npm install --legacy-peer-deps', { cwd, stdio: 'inherit' })
  execSync(
    `npx vite build --base=/games/${name}/ --outDir="${outDir}" --emptyOutDir`,
    { cwd, stdio: 'inherit' }
  )
}

console.log('\nAll games built successfully!')
