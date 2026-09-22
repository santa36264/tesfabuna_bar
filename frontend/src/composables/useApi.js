import { ref } from 'vue'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api' })

/**
 * Generic composable for API GET with automatic fallback to local mock data.
 * @param {string} endpoint  - API endpoint e.g. '/menu-items'
 * @param {Array}  mockData  - Local fallback data (from mockData.js)
 * @param {Object} params    - Optional query params
 */
export function useApi(endpoint, mockData = [], params = {}) {
  const data    = ref([...mockData])   // start with mock so UI renders immediately
  const loading = ref(false)
  const error   = ref(null)

  async function fetch(extraParams = {}) {
    loading.value = true
    error.value   = null
    try {
      const res  = await api.get(endpoint, { params: { ...params, ...extraParams } })
      const body = res.data
      // Support both { data: [...] } and plain array responses
      data.value = Array.isArray(body) ? body : (body.data ?? body)
    } catch (err) {
      console.warn(`API ${endpoint} unavailable, using mock data.`, err.message)
      error.value = err.message
      // keep mock data visible
    } finally {
      loading.value = false
    }
  }

  async function post(payload) {
    const res = await api.post(endpoint, payload)
    return res.data
  }

  return { data, loading, error, fetch, post }
}

export default api
