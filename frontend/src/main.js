import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { RouterView } from 'vue-router'
import i18n from './i18n'
import './style.css'
import 'aos/dist/aos.css'
import AOS from 'aos'

AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 })

// ── Determine which app to mount ──────────────────────────
// Admin paths use the admin router; everything else uses the customer router
const isAdmin = window.location.pathname.startsWith('/admin')

async function mountApp() {
  const pinia = createPinia()

  if (isAdmin) {
    // Lazy-load the admin router only when on /admin routes
    const { adminRouter } = await import('./admin/router')
    const AdminApp = { render: () => h(RouterView) }
    createApp(AdminApp).use(pinia).use(adminRouter).mount('#app')
  } else {
    createApp(App).use(pinia).use(router).use(i18n).mount('#app')
  }
}

mountApp()
