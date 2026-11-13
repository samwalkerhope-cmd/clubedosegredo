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

carregar
  .then(({ default: App }) => {
    sessionStorage.removeItem('clube.recarregou')
    createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  })
  .catch(() => {
    // Acontece quando uma versão nova foi publicada enquanto o app estava aberto:
    // os arquivos da versão antiga deixam de existir. Recarrega uma vez para pegar a nova.
    if (!sessionStorage.getItem('clube.recarregou')) {
      sessionStorage.setItem('clube.recarregou', '1')
      window.location.reload()
    }
  })
