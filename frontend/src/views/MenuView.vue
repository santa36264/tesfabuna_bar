<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-52 sm:h-72 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&q=80" alt="Ethiopian Food Menu" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div class="text-center">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Authentic Ethiopian</p>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('menu.title') }}</h1>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">

      <!-- Search + Dietary Filter -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6" data-aos="fade-up">
        <div class="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A5C45]" />
          <input v-model="searchQuery" type="text" :placeholder="t('menu.search')"
            :class="['w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#C8860A]/40 focus:border-[#C8860A] transition',
              themeStore.isDark
                ? 'bg-[#2A1408] border-[#5A2E18] text-[#F5ECD7] placeholder-[#7A5C45]'
                : 'bg-white border-[#DFC9A0] text-[#1C1008] placeholder-[#A0856A] shadow-sm']" />
        </div>
        <div class="flex gap-2 flex-wrap items-center">
          <span :class="['text-xs font-medium', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">Filter:</span>
          <button v-for="d in dietaryFilters" :key="d.value" @click="toggleDietary(d.value)"
            :class="[
              'text-xs font-semibold px-3 py-1.5 rounded-full border transition-all',
              activeDietary.includes(d.value)
                ? 'bg-[#C8860A] border-[#C8860A] text-white scale-105'
                : themeStore.isDark
                  ? 'border-[#5A2E18] text-[#C8A882] hover:border-[#C8860A] hover:text-[#C8860A]'
                  : 'border-[#DFC9A0] text-[#3B1F0A] hover:border-[#C8860A] hover:text-[#C8860A]'
            ]">
            {{ d.icon }} {{ d.label }}
          </button>
        </div>
      </div>

      <!-- Category Tabs -->
      <div class="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-1 scrollbar-hide" data-aos="fade-up">
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

      <!-- Items Grid -->
      <div v-if="filtered.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="(item, i) in filtered" :key="item.id"
          :data-aos="'fade-up'" :data-aos-delay="(i % 8) * 60"
          :class="['rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group',
            themeStore.isDark ? 'bg-[#3B1F0A] shadow-lg border border-[#5A2E18]' : 'bg-white shadow-md border border-[#DFC9A0]']">
          <div class="relative overflow-hidden h-44">
            <img :src="item.image" :alt="item.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <span v-if="item.popular"
              class="absolute top-2 left-2 bg-[#C8860A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              ⭐ Popular
            </span>
            <span class="absolute bottom-2 right-2 bg-white text-[#C8860A] text-sm font-bold px-3 py-1 rounded-full shadow">
              ETB {{ item.price }}
            </span>
          </div>
          <div class="p-4">
            <h3 :class="['font-semibold text-base mb-1 leading-tight', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
              {{ item.name }}
            </h3>
            <p :class="['text-xs leading-relaxed mb-2 line-clamp-2', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
              {{ item.description }}
            </p>
            <DietaryIcons :tags="item.dietary || []" class="mb-3" />
            <div :class="['flex items-center justify-between pt-2 border-t', themeStore.isDark ? 'border-[#5A2E18]' : 'border-[#E8D5B7]']">
              <span v-if="item.calories" :class="['text-xs', themeStore.isDark ? 'text-[#8A6A52]' : 'text-[#7A5C45]']">
                🔥 {{ item.calories }} cal
              </span>
              <span v-else></span>
              <RouterLink to="/reservation"
                class="text-xs font-semibold text-white bg-[#C8860A] hover:bg-[#A36A06] px-3 py-1.5 rounded-full transition-colors">
                Order
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-24" data-aos="fade-up">
        <p class="text-5xl mb-4">🍽️</p>
        <p :class="['text-lg font-medium mb-2', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">No dishes found</p>
        <p :class="['text-sm mb-6', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">Try a different search, category or dietary filter</p>
        <button @click="clearFilters"
          class="px-6 py-2.5 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold rounded-full transition-colors text-sm">
          Clear All Filters
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
import { menuItems as mockMenu } from '@/data/mockData'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import DietaryIcons from '@/components/ui/DietaryIcons.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import { useApi } from '@/composables/useApi'

const { t }      = useI18n()
const themeStore = useThemeStore()

const activeCategory = ref('all')
const searchQuery    = ref('')
const activeDietary  = ref([])

const { data: items, fetch } = useApi('/menu-items', mockMenu)
onMounted(fetch)

const categories = [
  { value: 'all',        label: 'menu.categories.all' },
  { value: 'appetizers', label: 'menu.categories.appetizers' },
  { value: 'breakfast',  label: 'menu.categories.breakfast' },
  { value: 'lunch',      label: 'menu.categories.lunch' },
  { value: 'dinner',     label: 'menu.categories.dinner' },
  { value: 'burgers',    label: 'menu.categories.burgers' },
  { value: 'pizza',      label: 'menu.categories.pizza' },
  { value: 'pasta',      label: 'menu.categories.pasta' },
  { value: 'desserts',   label: 'menu.categories.desserts' },
  { value: 'vegetarian', label: 'menu.categories.vegetarian' },
  { value: 'kids',       label: 'menu.categories.kids' },
]

const dietaryFilters = [
  { value: 'veg',   icon: '🌱', label: 'Vegetarian' },
  { value: 'vegan', icon: '🌿', label: 'Vegan' },
  { value: 'gf',    icon: '🌾', label: 'Gluten-Free' },
  { value: 'spicy', icon: '🌶️', label: 'Spicy' },
]

function toggleDietary(val) {
  const idx = activeDietary.value.indexOf(val)
  if (idx === -1) activeDietary.value.push(val)
  else activeDietary.value.splice(idx, 1)
}

function clearFilters() {
  searchQuery.value    = ''
  activeCategory.value = 'all'
  activeDietary.value  = []
}

const filtered = computed(() => {
  let list = items.value
  if (activeCategory.value !== 'all') list = list.filter(i => i.category === activeCategory.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(i => i.name.toLowerCase().includes(q) || (i.description && i.description.toLowerCase().includes(q)))
  }
  if (activeDietary.value.length) {
    list = list.filter(i => activeDietary.value.every(tag => (i.dietary || []).includes(tag)))
  }
  return list
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
