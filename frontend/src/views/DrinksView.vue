<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-52 sm:h-72 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1920&q=80" alt="Bar & Drinks" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div class="text-center">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Craft & Traditional</p>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('drinks.title') }}</h1>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">

      <!-- Category Tabs -->
      <div class="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-1 scrollbar-hide" data-aos="fade-up">
        <button v-for="cat in categories" :key="cat.value" @click="activeCategory = cat.value"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0',
            activeCategory === cat.value
              ? 'bg-[#C8860A] text-white shadow-md scale-105'
              : themeStore.isDark
                ? 'bg-[#3B1F0A] text-[#D4B896] hover:bg-[#4A2610]'
                : 'bg-white text-[#3B1F0A] border border-[#DFC9A0] hover:border-[#C8860A] hover:text-[#C8860A] shadow-sm'
          ]">
          {{ t(cat.label) }}
        </button>
      </div>

      <!-- Signature toggle -->
      <div class="flex items-center gap-3 mb-8" data-aos="fade-up">
        <button @click="sigOnly = !sigOnly"
          :class="[
            'flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all',
            sigOnly
              ? 'bg-[#6E1E2B] border-[#6E1E2B] text-white'
              : themeStore.isDark
                ? 'border-[#5A2E18] text-[#C8A882] hover:border-[#6E1E2B] hover:text-[#6E1E2B]'
                : 'border-[#DFC9A0] text-[#3B1F0A] hover:border-[#6E1E2B] hover:text-[#6E1E2B]'
          ]">
          🏆 Signature Only
        </button>
        <span v-if="sigOnly" class="text-xs text-[#6E1E2B] font-medium">Showing house originals</span>
      </div>

      <!-- Drinks Grid -->
      <div v-if="filtered.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="(drink, i) in filtered" :key="drink.id"
          :data-aos="'fade-up'" :data-aos-delay="(i % 8) * 60"
          :class="['rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group',
            themeStore.isDark ? 'bg-[#3B1F0A] shadow-lg border border-[#5A2E18]' : 'bg-white shadow-md border border-[#DFC9A0]']">
          <div class="relative overflow-hidden h-44">
            <img :src="drink.image" :alt="drink.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <span v-if="drink.signature"
              class="absolute top-2 left-2 bg-[#6E1E2B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
              🏆 Signature
            </span>
            <span class="absolute bottom-2 right-2 bg-white text-[#C8860A] text-sm font-bold px-3 py-1 rounded-full shadow">
              ETB {{ drink.price }}
            </span>
          </div>
          <div class="p-4">
            <h3 :class="['font-semibold text-base mb-1.5', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
              {{ drink.name }}
            </h3>
            <p :class="['text-xs leading-relaxed line-clamp-2', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
              {{ drink.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-16">
        <p class="text-4xl mb-3">🍹</p>
        <p :class="['text-lg font-medium', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">No drinks found.</p>
        <button @click="sigOnly = false; activeCategory = 'all'"
          class="mt-4 text-[#C8860A] hover:underline text-sm font-medium">
          Clear Filters
        </button>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { drinkItems as mockDrinks } from '@/data/mockData'
import BackToTop from '@/components/ui/BackToTop.vue'
import { useApi } from '@/composables/useApi'

const { t }         = useI18n()
const themeStore    = useThemeStore()
const activeCategory = ref('all')
const sigOnly        = ref(false)

const { data: items, fetch } = useApi('/drinks', mockDrinks)
onMounted(fetch)

const categories = [
  { value: 'all',      label: 'drinks.categories.all' },
  { value: 'cocktails', label: 'drinks.categories.cocktails' },
  { value: 'mocktails', label: 'drinks.categories.mocktails' },
  { value: 'beer',     label: 'drinks.categories.beer' },
  { value: 'wine',     label: 'drinks.categories.wine' },
  { value: 'whiskey',  label: 'drinks.categories.whiskey' },
  { value: 'vodka',    label: 'drinks.categories.vodka' },
  { value: 'gin',      label: 'drinks.categories.gin' },
  { value: 'tequila',  label: 'drinks.categories.tequila' },
  { value: 'rum',      label: 'drinks.categories.rum' },
  { value: 'soft',     label: 'drinks.categories.soft' },
  { value: 'coffee',   label: 'drinks.categories.coffee' },
  { value: 'juice',    label: 'drinks.categories.juice' },
]

const filtered = computed(() => {
  let list = items.value
  if (activeCategory.value !== 'all') list = list.filter(d => d.category === activeCategory.value)
  if (sigOnly.value) list = list.filter(d => d.signature)
  return list
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
