<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">
    <div class="relative h-48 sm:h-64 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80" alt="Blog" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/65 flex items-center justify-center">
        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('blog.title') }}</h1>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RouterLink
          v-for="(post, i) in blogPosts"
          :key="post.id"
          :to="'/blog/' + post.id"
          :data-aos="'fade-up'"
          :data-aos-delay="i * 100"
          :class="['rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group block border',
            themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18] shadow-lg' : 'bg-white border-[#DFC9A0] shadow-md']"
        >
          <div class="relative overflow-hidden h-52">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 bg-[#C8860A] text-white text-xs font-bold px-3 py-1 rounded-full">{{ post.category }}</span>
          </div>
          <div class="p-6">
            <div :class="['flex items-center gap-2 text-xs mb-3', themeStore.isDark ? 'text-[#8A6A52]' : 'text-[#7A5C45]']">
              <span>{{ post.author }}</span><span>.</span><span>{{ formatDate(post.date) }}</span>
            </div>
            <h2 :class="['font-serif text-xl font-bold mb-2 group-hover:text-[#C8860A] transition-colors', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
              {{ post.title }}
            </h2>
            <p :class="['text-sm leading-relaxed mb-4', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">{{ post.excerpt }}</p>
            <span class="text-[#C8860A] text-sm font-semibold">{{ t('blog.readMore') }} &rarr;</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { blogPosts as mockBlog } from '@/data/mockData'
import { useApi } from '@/composables/useApi'

const { t }      = useI18n()
const themeStore = useThemeStore()

const { data: blogPosts, fetch } = useApi('/blog', mockBlog)
onMounted(fetch)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
