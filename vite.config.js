import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// "npm run build" gera o site normal (pasta dist), usado pela Vercel.
// "npm run build:preview" gera um único arquivo HTML (pasta dist-preview), só para pré-visualização.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'preview' ? [viteSingleFile()] : [])],
  build: { outDir: mode === 'preview' ? 'dist-preview' : 'dist' },
}))
