<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    themeStore.isDark
      ? 'bg-[#1A0F07] text-[#F5ECD7]'   /* espresso dark */
      : 'bg-[#FBF6EE] text-[#1C1008]'   /* parchment light */
  ]">
    <Navbar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import Navbar from '@/components/layout/Navbar.vue'
import SiteFooter from '@/components/layout/Footer.vue'

const themeStore = useThemeStore()
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>
