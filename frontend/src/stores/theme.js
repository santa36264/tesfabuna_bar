import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  function applyTheme(dark) {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      html.style.backgroundColor = '#1A0F07'   // espresso
    } else {
      html.classList.remove('dark')
      html.style.backgroundColor = '#FBF6EE'   // parchment
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  // Apply immediately on store init
  applyTheme(isDark.value)

  watch(isDark, applyTheme)

  return { isDark, toggle }
})
