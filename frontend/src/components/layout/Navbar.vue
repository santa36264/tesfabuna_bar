<template>
  <nav :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300', navBg]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">

        <!-- ── Logo ─────────────────────────── -->
        <RouterLink to="/" class="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <img src="/logo.png" alt="TesfaBunna" class="h-14 sm:h-16 lg:h-20 w-auto object-contain" />
          <div>
            <div class="font-serif font-bold text-xl sm:text-2xl lg:text-3xl leading-none text-[#C8860A]">TesfaBunna</div>
            <div :class="['text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase font-medium', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
              Bar & Restaurant
            </div>
          </div>
        </RouterLink>

        <!-- ── Desktop Links ─────────────────── -->
        <div class="hidden lg:flex items-center gap-0.5">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-[#C8860A]',
              themeStore.isDark
                ? 'text-[#F5ECD7]/80 hover:bg-[#3B1F0A]'
                : 'text-[#3B1F0A] hover:bg-[#F5ECD7]'
            ]"
            active-class="!text-[#C8860A]"
          >
            {{ t(link.label) }}
          </RouterLink>
        </div>

        <!-- ── Actions ───────────────────────── -->
        <div class="flex items-center gap-2">
          <!-- Language -->
          <button
            @click="toggleLocale"
            :class="[
              'text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors',
              themeStore.isDark
                ? 'border-[#6B3A2A] text-[#C8860A] hover:bg-[#3B1F0A]'
                : 'border-[#C8860A]/40 text-[#6B3A2A] hover:border-[#C8860A] hover:text-[#C8860A]'
            ]"
          >
            {{ locale === 'en' ? 'አማ' : 'EN' }}
          </button>

          <!-- Dark/Light -->
          <button
            @click="themeStore.toggle"
            :class="[
              'p-2 rounded-lg transition-colors',
              themeStore.isDark
                ? 'text-[#C8860A] hover:bg-[#3B1F0A]'
                : 'text-[#6B3A2A] hover:bg-[#F5ECD7]'
            ]"
            :aria-label="themeStore.isDark ? t('common.lightMode') : t('common.darkMode')"
          >
            <SunIcon  v-if="themeStore.isDark" class="w-5 h-5" />
            <MoonIcon v-else                   class="w-5 h-5" />
          </button>

          <!-- Reserve CTA -->
          <RouterLink
            to="/reservation"
            class="hidden sm:inline-flex items-center px-5 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
          >
            {{ t('hero.reserve') }}
          </RouterLink>

          <!-- Mobile hamburger -->
          <button
            @click="mobileOpen = !mobileOpen"
            :class="[
              'lg:hidden p-2 rounded-lg transition-colors',
              themeStore.isDark
                ? 'text-[#F5ECD7] hover:bg-[#3B1F0A]'
                : 'text-[#3B1F0A] hover:bg-[#F5ECD7]'
            ]"
            :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          >
            <Bars3Icon v-if="!mobileOpen" class="w-6 h-6" />
            <XMarkIcon v-else             class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- ── Mobile Menu ──────────────────────── -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        :class="[
          'lg:hidden border-t',
          themeStore.isDark
            ? 'bg-[#1A0F07] border-[#3B1F0A]'
            : 'bg-[#FBF6EE] border-[#F5ECD7] shadow-lg'
        ]"
      >
        <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="mobileOpen = false"
            :class="[
              'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              themeStore.isDark
                ? 'text-[#F5ECD7]/80 hover:text-[#C8860A] hover:bg-[#3B1F0A]'
                : 'text-[#3B1F0A] hover:text-[#C8860A] hover:bg-[#F5ECD7]'
            ]"
            active-class="!text-[#C8860A]"
          >
            {{ t(link.label) }}
          </RouterLink>
          <div :class="['my-2 border-t', themeStore.isDark ? 'border-[#3B1F0A]' : 'border-[#F5ECD7]']"></div>
          <RouterLink
            to="/reservation"
            @click="mobileOpen = false"
            class="text-center px-5 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-full"
          >
            {{ t('hero.reserve') }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()
const themeStore    = useThemeStore()
const route         = useRoute()
const scrolled      = ref(false)
const mobileOpen    = ref(false)

const navBg = computed(() => {
  const onHome = route.path === '/'
  if (themeStore.isDark) {
    return onHome && !scrolled.value
      ? 'bg-transparent'
      : 'bg-[#1A0F07]/95 backdrop-blur-md shadow-lg border-b border-[#3B1F0A]'
  }
  return 'bg-[#FBF6EE]/95 backdrop-blur-sm shadow-sm border-b border-[#F5ECD7]'
})

const navLinks = [
  { to: '/',            label: 'nav.home' },
  { to: '/about',       label: 'nav.about' },
  { to: '/menu',        label: 'nav.menu' },
  { to: '/drinks',      label: 'nav.drinks' },
  { to: '/gallery',     label: 'nav.gallery' },
  { to: '/blog',        label: 'nav.blog' },
  { to: '/qr-menu',     label: 'nav.qrMenu' },
  { to: '/contact',     label: 'nav.contact' },
  

]

function handleScroll() { scrolled.value = window.scrollY > 80 }
function toggleLocale() {
  locale.value = locale.value === 'en' ? 'am' : 'en'
  localStorage.setItem('locale', locale.value)
}

watch(() => route.path, () => { mobileOpen.value = false })
onMounted(()  => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
