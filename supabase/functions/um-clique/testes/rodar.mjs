// Copia index.ts (que é JavaScript puro) para .mjs e roda os testes com o Node.
import { copyFileSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const aqui = fileURLToPath(new URL('.', import.meta.url))
copyFileSync(aqui + '../index.ts', aqui + 'index.copia.mjs')
const r = spawnSync(process.execPath, ['--test', aqui + 'um-clique.test.mjs'], { stdio: 'inherit' })
rmSync(aqui + 'index.copia.mjs', { force: true })
process.exit(r.status ?? 1)
