import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
  const items = ref([])
  const drinks = ref([])
  const activeCategory = ref('all')
  const searchQuery = ref('')
  const loading = ref(false)

  const filteredItems = computed(() => {
    let list = items.value
    if (activeCategory.value !== 'all') {
      list = list.filter(i => i.category === activeCategory.value)
    }
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q)
      )
    }
    return list
  })

  const filteredDrinks = computed(() => {
    if (activeCategory.value === 'all') return drinks.value
    return drinks.value.filter(d => d.category === activeCategory.value)
  })

  async function fetchMenuItems() {
    loading.value = true
    try {
      const res = await axios.get('/api/menu-items')
      items.value = res.data.data
    } catch {
      // fallback to mock data handled in component
    } finally {
      loading.value = false
    }
  }

  async function fetchDrinks() {
    loading.value = true
    try {
      const res = await axios.get('/api/drinks')
      drinks.value = res.data.data
    } catch {
      // fallback to mock data
    } finally {
      loading.value = false
    }
  }

  function setCategory(cat) {
    activeCategory.value = cat
  }

  return { items, drinks, activeCategory, searchQuery, loading, filteredItems, filteredDrinks, fetchMenuItems, fetchDrinks, setCategory }
})
