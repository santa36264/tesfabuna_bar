import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useReservationStore = defineStore('reservation', () => {
  const loading = ref(false)
  const success = ref(false)
  const error = ref(null)

  async function submit(form) {
    loading.value = true
    success.value = false
    error.value = null
    try {
      await axios.post('/api/reservations', form)
      success.value = true
    } catch (err) {
      error.value = err.response?.data?.message || 'Booking failed. Please try again.'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    success.value = false
    error.value = null
  }

  return { loading, success, error, submit, reset }
})
