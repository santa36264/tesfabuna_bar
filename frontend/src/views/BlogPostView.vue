<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <div v-if="post" class="max-w-3xl mx-auto px-4 py-14">

      <RouterLink to="/blog"
        :class="['inline-flex items-center gap-1.5 text-sm font-medium mb-8 hover:text-[#C8860A] transition-colors',
          themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
        ← Back to Blog
      </RouterLink>

      <span class="inline-block bg-[#C8860A] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
        {{ post.category }}
      </span>

      <h1 :class="['font-serif text-3xl sm:text-4xl font-bold mb-3 leading-tight',
        themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
        {{ post.title }}
      </h1>

      <div :class="['flex items-center gap-3 text-sm mb-8', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
        <span>✍️ {{ post.author }}</span>
        <span>·</span>
        <span> {{ formatDate(post.date) }}</span>
      </div>

      <img :src="post.image" :alt="post.title"
        class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-8 shadow-md" />

      <article :class="['space-y-5 text-base leading-relaxed', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">
        <p :class="['text-lg font-medium', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
          {{ post.excerpt }}
        </p>
        <p>
          At TesfaBunna, we believe food is more than sustenance — it's a celebration of culture, heritage and community.
          Our chefs pour years of experience and deep cultural knowledge into every dish, sourcing the freshest local
          ingredients from trusted Ethiopian farms.
        </p>
        <p>
          This update reflects our ongoing commitment to keeping our menu seasonal, authentic and exciting.
          Whether you're a longtime regular or visiting us for the first time, we invite you to come experience
          these new additions in person.
        </p>
        <p>
          We look forward to welcoming you. Reserve your table online or call us at
          <a href="tel:+251911628825" class="text-[#C8860A] hover:underline font-medium">+251 91 162 8825</a>.
        </p>
      </article>

      <hr :class="['my-10', themeStore.isDark ? 'border-[#5A2E18]' : 'border-[#E8D5B7]']" />

      <div :class="['p-8 rounded-2xl border text-center', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']">
        <h3 :class="['font-serif text-xl font-bold mb-2', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
          Ready to taste it yourself?
        </h3>
        <p :class="['text-sm mb-5', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
          Book a table and experience our latest menu live.
        </p>
        <RouterLink to="/reservation"
          class="inline-flex items-center gap-2 px-7 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full transition-colors shadow-md">
          Reserve a Table
        </RouterLink>
      </div>
    </div>

    <div v-else class="text-center py-28">
      <p class="text-5xl mb-4">�</p>
      <p :class="['text-xl font-semibold mb-2', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">Post not found</p>
      <RouterLink to="/blog" class="text-[#C8860A] hover:underline mt-1 inline-block text-sm">
        ← Back to Blog
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { blogPosts } from '@/data/mockData'

const route      = useRoute()
const themeStore = useThemeStore()
const post       = computed(() => blogPosts.find(p => p.id === Number(route.params.id)))

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
</script>
