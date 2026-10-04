<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-48 sm:h-52 md:h-64 lg:h-72 overflow-hidden">
      <img src="/76901734_103972781063369_6198513861197299712_n.jpg" alt="Gallery" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div class="text-center">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Our Atmosphere</p>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('gallery.title') }}</h1>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">

      <!-- Category Filter Tabs -->
      <div class="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-1 scrollbar-hide" data-aos="fade-up">
        <button
          v-for="cat in categories" :key="cat.value"
          @click="activeCategory = cat.value"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0',
            activeCategory === cat.value
              ? 'bg-[#C8860A] text-white shadow-md scale-105'
              : themeStore.isDark
                ? 'bg-[#3B1F0A] text-[#D4B896] hover:bg-[#4A2610]'
                : 'bg-white text-[#3B1F0A] border border-[#DFC9A0] hover:border-[#C8860A] hover:text-[#C8860A] shadow-sm'
          ]"
        >
          {{ t(cat.label) }}
        </button>
      </div>

      <!-- Masonry Grid -->
      <div class="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-gap:1rem]">
        <div
          v-for="(img, i) in filtered" :key="img.id"
          :data-aos="'zoom-in'" :data-aos-delay="(i % 8) * 60"
          class="break-inside-avoid mb-4 relative overflow-hidden rounded-xl group cursor-pointer"
          @click="openLightbox(img)"
        >
          <img :src="img.src" :alt="img.alt"
            class="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span class="text-white text-xs font-medium">{{ img.alt }}</span>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filtered.length === 0" class="text-center py-16">
        <p class="text-4xl mb-3">📷</p>
        <p :class="['text-lg font-medium', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">No images in this category yet.</p>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="lightboxImage"
        class="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
        @click.self="lightboxImage = null">
        <button @click="lightboxImage = null"
          class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          aria-label="Close">
          <XMarkIcon class="w-6 h-6" />
        </button>
        <button @click="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          aria-label="Previous">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          aria-label="Next">
          <ChevronRightIcon class="w-6 h-6" />
        </button>
        <img :src="lightboxImage.src" :alt="lightboxImage.alt"
          class="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
        <p class="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">{{ lightboxImage.alt }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { galleryImages as mockGallery } from '@/data/mockData'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useApi } from '@/composables/useApi'

const { t }          = useI18n()
const themeStore     = useThemeStore()
const activeCategory = ref('all')
const lightboxImage  = ref(null)

const { data: images, fetch } = useApi('/gallery', mockGallery)
onMounted(fetch)

const categories = [
  { value: 'all',      label: 'gallery.categories.all' },
  { value: 'interior', label: 'gallery.categories.interior' },
  { value: 'outdoor',  label: 'gallery.categories.outdoor' },
  { value: 'food',     label: 'gallery.categories.food' },
  { value: 'drinks',   label: 'gallery.categories.drinks' },
  { value: 'bar',      label: 'gallery.categories.bar' },
  { value: 'music',    label: 'gallery.categories.music' },
  { value: 'staff',    label: 'gallery.categories.staff' },
]

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? images.value
    : images.value.filter(img => img.category === activeCategory.value)
)

function openLightbox(img) { lightboxImage.value = img }

function prevImage() {
  const list = filtered.value
  const idx  = list.findIndex(i => i.id === lightboxImage.value.id)
  lightboxImage.value = list[(idx - 1 + list.length) % list.length]
}
function nextImage() {
  const list = filtered.value
  const idx  = list.findIndex(i => i.id === lightboxImage.value.id)
  lightboxImage.value = list[(idx + 1) % list.length]
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
