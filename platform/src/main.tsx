import { createRoot } from 'react-dom/client'
import React from 'react'
import AppRoutes from './pages/routes'
import { HashRouter } from 'react-router-dom'
import './shared/i18n/i18n'
import './style/theme.scss'
import './style/initial.scss'
import './style/utils.scss'
import 'tailwindcss/tailwind.css'
import { http } from './shared/io/io'

http.initial({
  timeout: 30000,
  baseURL: '/api'
})

createRoot(document.getElementById('__APP_CONTAINER__')!).render(
  <HashRouter>
    <AppRoutes />
  </HashRouter>
)
