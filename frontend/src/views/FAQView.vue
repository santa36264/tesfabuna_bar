<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-white' : 'bg-[#FBF6EE] text-[#1C1008]']">
    <div class="relative h-48 sm:h-64 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" alt="FAQ" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/65 flex items-center justify-center">
        <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('faq.title') }}</h1>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-14">
      <div class="space-y-4">
        <div
          v-for="(item, i) in faqItems"
          :key="i"
          :data-aos="'fade-up'"
          :data-aos-delay="i * 60"
          :class="['rounded-xl overflow-hidden border', themeStore.isDark ? 'border-[#5A2E18]' : 'border-[#DFC9A0] shadow-sm bg-white']"
        >
          <button
            @click="toggle(i)"
            :class="['w-full flex items-center justify-between p-5 text-left transition-colors', themeStore.isDark ? 'bg-[#3B1F0A] hover:bg-[#4A2610]' : 'bg-white hover:bg-[#FBF6EE]']"
          >
            <span :class="['font-semibold pr-4', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ item.q }}</span>
            <ChevronDownIcon :class="['w-5 h-5 flex-shrink-0 text-[#C8860A] transition-transform duration-300', openIndex === i ? 'rotate-180' : '']" />
          </button>
          <Transition name="accordion">
            <div v-if="openIndex === i" :class="['px-5 pb-5 text-sm leading-relaxed border-t', themeStore.isDark ? 'bg-[#3B1F0A] text-[#D4B896] border-[#5A2E18]' : 'bg-white text-[#3B1F0A] border-[#E8D5B7]']">
              {{ item.a }}
            </div>
          </Transition>
        </div>
      </div>

      <!-- Still have questions? -->
      <div :class="['mt-14 text-center p-10 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']" data-aos="fade-up">
        <h3 :class="['font-serif text-2xl font-bold mb-2', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">Still have questions?</h3>
        <p :class="['mb-6', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#2A1208]']">Our team is happy to help. Reach out anytime.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contact" class="px-6 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full transition-colors">
            Contact Us
          </RouterLink>
          <a href="tel:+251911628825" :class="['px-6 py-3 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold rounded-full transition-colors']">
            Call Us
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { faqItems } from '@/data/mockData'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()
const themeStore = useThemeStore()
const openIndex = ref(null)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
