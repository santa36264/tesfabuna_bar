import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const BACKEND = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ── Standalone axios instance exported directly ──────────────
// NOT inside Pinia — avoids Vue reactivity proxying the axios object
export const adminApi = axios.create({ baseURL: `${BACKEND}/api` })

adminApi.interceptors.request.use(config => {
  const t = localStorage.getItem('admin_token')
  if (t) config.headers.Authorization = `Bearer ${t}`
  return config
})

// ── Auth store — only for login state ────────────────────────
export const useAdminAuth = defineStore('adminAuth', () => {
  const token   = ref(localStorage.getItem('admin_token') || null)
  const user    = ref(JSON.parse(localStorage.getItem('admin_user') || 'null'))
  const error   = ref(null)
  const loading = ref(false)

  async function login(email, password) {
    loading.value = true
    error.value   = null
    try {
      const res = await axios.post(`${BACKEND}/api/auth/login`, { email, password })
      token.value = res.data.token
      user.value  = res.data.user
      localStorage.setItem('admin_token', token.value)
      localStorage.setItem('admin_user',  JSON.stringify(user.value))
      return true
    } catch (err) {
      error.value = err.response?.data?.errors?.email?.[0]
                 || err.response?.data?.message
                 || 'Login failed. Check your credentials.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try { await adminApi.post('/admin/logout') } catch {}
    token.value = null
    user.value  = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  function isLoggedIn() { return !!token.value }

  // api is NOT in the return — use the exported adminApi directly
  return { token, user, error, loading, login, logout, isLoggedIn }
})
