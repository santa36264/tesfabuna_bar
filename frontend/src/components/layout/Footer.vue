<template>
  <!-- Footer always uses espresso dark — coffee bar feel regardless of theme -->
  <footer class="bg-[#1A0F07] border-t border-[#3B1F0A] pt-16 pb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-[#3B1F0A]">

        <!-- ── Brand ──────────────────────── -->
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="TesfaBunna" class="h-20 w-auto object-contain" />
            <div>
              <div class="font-serif font-bold text-lg text-[#C8860A] leading-none">TesfaBunna</div>
              <div class="text-[9px] tracking-[3px] uppercase text-[#7A5C45] font-medium">Bar & Restaurant</div>
            </div>
          </div>
          <p class="text-[#7A5C45] text-sm leading-relaxed mb-5">
            {{ t('hero.slogan') }}
          </p>
          <!-- Social icons -->
          <div class="flex gap-2.5">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank" rel="noopener"
              class="w-9 h-9 rounded-full bg-[#3B1F0A] hover:bg-[#C8860A] flex items-center justify-center text-[#C8860A] hover:text-white transition-colors"
              :aria-label="social.name"
            >
              <svg v-if="social.name === 'Facebook'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
              <svg v-else-if="social.name === 'Instagram'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-linecap="round"/>
              </svg>
              <svg v-else-if="social.name === 'Twitter'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <svg v-else-if="social.name === 'TikTok'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- ── Quick Links ─────────────────── -->
        <div>
          <h3 class="text-[#F5ECD7] font-semibold mb-4 text-sm tracking-wide uppercase">{{ t('footer.quickLinks') }}</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink :to="link.to" class="text-[#7A5C45] hover:text-[#C8860A] text-sm transition-colors">
                {{ t(link.label) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- ── Opening Hours ───────────────── -->
        <div>
          <h3 class="text-[#F5ECD7] font-semibold mb-4 text-sm tracking-wide uppercase">{{ t('footer.hours') }}</h3>
          <ul class="space-y-2 text-sm text-[#7A5C45]">
            <li class="flex justify-between gap-4">
              <span>{{ t('common.monFri') }}</span>
              <span class="text-[#F5ECD7]/70">11:00 AM – 11:00 PM</span>
            </li>
            <li class="flex justify-between gap-4">
              <span>{{ t('common.satSun') }}</span>
              <span class="text-[#F5ECD7]/70">10:00 AM – 12:00 AM</span>
            </li>
            <li class="mt-3 flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span class="text-green-400 text-xs font-medium">Open Now</span>
            </li>
          </ul>
          <div class="mt-5 text-sm text-[#7A5C45] space-y-1.5">
            <p>📍 Dessie, Ethiopia</p>
            <p>📞 +251 91 162 8825</p>
            <p>✉️ hello@tesfabunna.com</p>
          </div>
        </div>

        <!-- ── Newsletter ──────────────────── -->
        <div>
          <h3 class="text-[#F5ECD7] font-semibold mb-2 text-sm tracking-wide uppercase">{{ t('footer.newsletter') }}</h3>
          <p class="text-[#7A5C45] text-sm mb-4">{{ t('footer.newsletterDesc') }}</p>
          <form @submit.prevent="subscribeNewsletter" class="flex flex-col gap-2">
            <input
              v-model="email"
              type="email"
              required
              :placeholder="t('footer.emailPlaceholder')"
              class="px-4 py-2.5 rounded-lg bg-[#3B1F0A] border border-[#6B3A2A] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition-colors"
            />
            <button
              type="submit"
              class="px-4 py-2.5 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {{ subscribed ? '✓ Subscribed!' : t('footer.subscribe') }}
            </button>
          </form>
        </div>
      </div>

      <!-- ── Bottom bar ──────────────────────── -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-[#7A5C45] text-xs">
          © {{ new Date().getFullYear() }} TesfaBunna Bar & Restaurant. {{ t('footer.rights') }}
        </p>
        <div class="flex gap-4 text-xs text-[#7A5C45]">
          <a href="#" class="hover:text-[#C8860A] transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-[#C8860A] transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { t }      = useI18n()
const themeStore = useThemeStore()
const email      = ref('')
const subscribed = ref(false)

const navLinks = [
  { to: '/',            label: 'nav.home' },
  { to: '/about',       label: 'nav.about' },
  { to: '/menu',        label: 'nav.menu' },
  { to: '/drinks',      label: 'nav.drinks' },
  { to: '/reservation', label: 'nav.reservation' },
  { to: '/gallery',     label: 'nav.gallery' },
  { to: '/blog',        label: 'nav.blog' },
  { to: '/contact',     label: 'nav.contact' },
  { to: '/faq',         label: 'nav.faq' },
  {to:'/testimonials' , label:'nav.testimonials'},
]

const socials = [
  { name: 'Facebook',  url: 'https://facebook.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'Twitter',   url: 'https://twitter.com' },
  { name: 'TikTok',    url: 'https://tiktok.com' },
]

function subscribeNewsletter() {
  subscribed.value = true
  email.value = ''
  setTimeout(() => (subscribed.value = false), 3000)
}
</script>
