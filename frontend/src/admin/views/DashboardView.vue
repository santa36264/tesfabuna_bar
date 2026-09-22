<template>
  <div>
    <h2 class="font-serif text-2xl font-bold text-[#F5ECD7] mb-6">Dashboard</h2>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="card in statCards" :key="card.label"
        class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl p-5">
        <div class="flex items-center justify-between mb-3">
          <span class="text-[#7A5C45] text-xs font-medium uppercase tracking-wider">{{ card.label }}</span>
          <component :is="card.icon" class="w-5 h-5 text-[#C8860A]" />
        </div>
        <div class="font-serif text-3xl font-bold text-[#F5ECD7]">{{ card.value }}</div>
        <div v-if="card.sub" class="text-xs text-[#7A5C45] mt-1">{{ card.sub }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Reservations -->
      <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-[#F5ECD7]">Recent Reservations</h3>
          <RouterLink to="/admin/reservations" class="text-xs text-[#C8860A] hover:underline">View all</RouterLink>
        </div>
        <div v-if="recentRes.length" class="space-y-3">
          <div v-for="r in recentRes" :key="r.id"
            class="flex items-center justify-between py-2 border-b border-[#5A2E18] last:border-0">
            <div>
              <p class="text-sm font-medium text-[#F5ECD7]">{{ r.name }}</p>
              <p class="text-xs text-[#7A5C45]">{{ r.date }} at {{ r.time }} &bull; {{ r.guests }} guests</p>
            </div>
            <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', statusClass(r.status)]">
              {{ r.status }}
            </span>
          </div>
        </div>
        <p v-else class="text-[#7A5C45] text-sm">No reservations yet.</p>
      </div>

      <!-- Recent Messages -->
      <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-[#F5ECD7]">Unread Messages</h3>
          <RouterLink to="/admin/messages" class="text-xs text-[#C8860A] hover:underline">View all</RouterLink>
        </div>
        <div v-if="recentMsg.length" class="space-y-3">
          <div v-for="m in recentMsg" :key="m.id"
            class="py-2 border-b border-[#5A2E18] last:border-0">
            <p class="text-sm font-medium text-[#F5ECD7]">{{ m.name }}</p>
            <p class="text-xs text-[#C8860A]">{{ m.subject || 'No subject' }}</p>
            <p class="text-xs text-[#7A5C45] mt-0.5 line-clamp-1">{{ m.message }}</p>
          </div>
        </div>
        <p v-else class="text-[#7A5C45] text-sm">No unread messages.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'
import {
  ListBulletIcon, BeakerIcon, PhotoIcon, CalendarIcon,
  StarIcon, EnvelopeIcon, NewspaperIcon, UserGroupIcon,
} from '@heroicons/vue/24/outline'

const auth      = useAdminAuth()
const stats     = ref({})
const recentRes = ref([])
const recentMsg = ref([])

async function load() {
  try {
    const [s, r, m] = await Promise.all([
      adminApi.get('/admin/dashboard/stats'),
      adminApi.get('/admin/dashboard/recent-reservations'),
      adminApi.get('/admin/dashboard/recent-messages'),
    ])
    stats.value     = s.data
    recentRes.value = r.data.data
    recentMsg.value = m.data.data
  } catch {}
}

const statCards = computed(() => [
  { label: 'Menu Items',    value: stats.value.menu_items   ?? '--', icon: ListBulletIcon,  sub: null },
  { label: 'Drinks',        value: stats.value.drinks        ?? '--', icon: BeakerIcon,      sub: null },
  { label: 'Gallery',       value: stats.value.gallery       ?? '--', icon: PhotoIcon,       sub: null },
  { label: 'Blog Posts',    value: stats.value.blog_posts    ?? '--', icon: NewspaperIcon,   sub: null },
  { label: 'Reservations',  value: stats.value.reservations?.total    ?? '--', icon: CalendarIcon, sub: `${stats.value.reservations?.pending ?? 0} pending` },
  { label: 'Testimonials',  value: stats.value.testimonials?.approved ?? '--', icon: StarIcon,     sub: `${stats.value.testimonials?.pending ?? 0} pending` },
  { label: 'Messages',      value: stats.value.messages?.unread       ?? '--', icon: EnvelopeIcon, sub: 'unread' },
  { label: 'Subscribers',   value: stats.value.subscribers   ?? '--', icon: UserGroupIcon,  sub: 'active' },
])

function statusClass(status) {
  return {
    pending:   'bg-yellow-900/40 text-yellow-400',
    confirmed: 'bg-green-900/40 text-green-400',
    cancelled: 'bg-red-900/40 text-red-400',
  }[status] || 'bg-[#5A2E18] text-[#C8A882]'
}

onMounted(load)
</script>
