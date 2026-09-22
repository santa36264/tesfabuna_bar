<template>
  <div :class="['min-h-screen flex items-center justify-center px-4', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">
    <div class="text-center" data-aos="zoom-in">
      <div class="text-8xl mb-6">🍽️</div>
      <h1 class="font-serif text-7xl font-bold text-[#C8860A] mb-4">404</h1>
      <h2 :class="['text-2xl font-semibold mb-3', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
        Page Not Found
      </h2>
      <p :class="['text-lg mb-8', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
        Looks like this page is off the menu.
      </p>
      <RouterLink to="/"
        class="inline-flex items-center gap-2 px-8 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full transition-colors shadow-md">
        ← Back to Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>
