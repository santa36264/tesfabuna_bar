<template>
  <div class="min-h-screen bg-[#1A0F07] flex">

    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300',
      sidebarOpen ? 'w-64' : 'w-16', 'bg-[#0F0905] border-r border-[#3B1F0A]']">

      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-5 border-b border-[#3B1F0A]">
        <img src="/icon.png" alt="T" class="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        <span v-if="sidebarOpen" class="font-serif font-bold text-[#C8860A] text-lg truncate">TesfaBunna</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          :class="['flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group',
            $route.path.startsWith(item.to) && item.to !== '/admin'
              ? 'bg-[#C8860A] text-white'
              : $route.path === '/admin' && item.to === '/admin'
                ? 'bg-[#C8860A] text-white'
                : 'text-[#C8A882] hover:bg-[#3B1F0A] hover:text-[#F5ECD7]']">
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="sidebarOpen" class="text-sm font-medium truncate">{{ item.label }}</span>
          <span v-if="sidebarOpen && item.badge" class="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{{ item.badge }}</span>
        </RouterLink>
      </nav>

      <!-- User + Logout -->
      <div class="px-2 py-4 border-t border-[#3B1F0A]">
        <div v-if="sidebarOpen" class="px-3 py-2 mb-2">
          <p class="text-[#F5ECD7] text-sm font-medium truncate">{{ auth.user?.name }}</p>
          <p class="text-[#7A5C45] text-xs truncate">{{ auth.user?.email }}</p>
        </div>
        <button @click="handleLogout"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#C8A882] hover:bg-red-900/30 hover:text-red-400 transition-colors w-full">
          <ArrowRightOnRectangleIcon class="w-5 h-5 flex-shrink-0" />
          <span v-if="sidebarOpen" class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div :class="['flex-1 flex flex-col transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-16']">

      <!-- Top bar -->
      <header class="h-14 bg-[#0F0905] border-b border-[#3B1F0A] flex items-center px-4 gap-4 sticky top-0 z-30">
        <button @click="sidebarOpen = !sidebarOpen"
          class="text-[#C8A882] hover:text-[#F5ECD7] transition-colors">
          <Bars3Icon class="w-6 h-6" />
        </button>
        <h1 class="text-[#F5ECD7] font-semibold text-sm flex-1">{{ currentTitle }}</h1>
        <a href="/" target="_blank" class="text-xs text-[#C8860A] hover:underline flex items-center gap-1">
          <ArrowTopRightOnSquareIcon class="w-4 h-4" />
          View Site
        </a>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminAuth } from '../stores/auth'
import {
  Squares2X2Icon, ListBulletIcon, BeakerIcon, PhotoIcon,
  NewspaperIcon, CalendarIcon, StarIcon, EnvelopeIcon,
  ArrowRightOnRectangleIcon, Bars3Icon, ArrowTopRightOnSquareIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

const auth        = useAdminAuth()
const route       = useRoute()
const router      = useRouter()
const sidebarOpen = ref(true)

const navItems = [
  { to: '/admin',             label: 'Dashboard',    icon: Squares2X2Icon  },
  { to: '/admin/menu',        label: 'Food Menu',    icon: ListBulletIcon  },
  { to: '/admin/drinks',      label: 'Bar & Drinks', icon: BeakerIcon      },
  { to: '/admin/gallery',     label: 'Gallery',      icon: PhotoIcon       },
  { to: '/admin/blog',        label: 'Blog',         icon: NewspaperIcon   },
  { to: '/admin/reservations', label: 'Reservations', icon: CalendarIcon   },
  { to: '/admin/testimonials', label: 'Testimonials', icon: StarIcon       },
  { to: '/admin/messages',    label: 'Messages',     icon: EnvelopeIcon    },
  { to: '/admin/profile',     label: 'My Profile',   icon: UserCircleIcon  },
]

const titleMap = {
  '/admin':              'Dashboard',
  '/admin/menu':         'Food Menu',
  '/admin/drinks':       'Bar & Drinks',
  '/admin/gallery':      'Gallery',
  '/admin/blog':         'Blog Posts',
  '/admin/reservations': 'Reservations',
  '/admin/testimonials': 'Testimonials',
  '/admin/messages':     'Messages',
  '/admin/profile':      'My Profile',
}
const currentTitle = computed(() => titleMap[route.path] || 'Admin')

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'AdminLogin' })
}
</script>
