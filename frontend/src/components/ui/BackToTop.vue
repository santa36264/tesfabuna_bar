<template>
  <Transition name="btt">
    <button
      v-if="visible"
      @click="scrollToTop"
      :class="[
        'fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all',
        'bg-[#C8860A] hover:bg-[#A36A06] text-white'
      ]"
      aria-label="Back to top"
    >
      <ChevronUpIcon class="w-5 h-5" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 400
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(()  => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.btt-enter-active, .btt-leave-active { transition: all 0.25s ease; }
.btt-enter-from, .btt-leave-to       { opacity: 0; transform: translateY(12px); }
</style>
