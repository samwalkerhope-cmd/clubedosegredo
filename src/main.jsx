import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Idioma do site: definido pela variável VITE_IDIOMA na Vercel ("es" = espanhol; vazio = português).
// Cada site carrega só as telas e o conteúdo do seu idioma.
const espanhol = import.meta.env.VITE_IDIOMA === 'es'

if (espanhol) {
  document.documentElement.lang = 'es'
  document.title = 'Club del Secreto'
  document.querySelector('link[rel="manifest"]')?.setAttribute('href', '/manifest.es.webmanifest')
}

const carregar = espanhol ? import('./App.es.jsx') : import('./App.jsx')

carregar.then(({ default: App }) => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
