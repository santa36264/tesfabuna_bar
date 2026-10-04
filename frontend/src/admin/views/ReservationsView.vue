<template>
  <div>
    <h2 class="font-serif text-2xl font-bold text-[#F5ECD7] mb-6">Reservations</h2>

    <div class="flex gap-2 flex-wrap mb-5">
      <button v-for="s in ['all','pending','confirmed','cancelled']" :key="s" @click="filterStatus = s"
        :class="['px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors',
          filterStatus === s ? 'bg-[#C8860A] text-white' : 'bg-[#3B1F0A] text-[#C8A882] hover:bg-[#4A2610]']">
        {{ s }} <span v-if="s !== 'all'" class="ml-1 opacity-70">({{ counts[s] ?? 0 }})</span>
      </button>
    </div>

    <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl overflow-x-auto">
      <table class="w-full text-sm min-w-[800px]">
        <thead class="border-b border-[#5A2E18]">
          <tr class="text-[#7A5C45] text-xs uppercase tracking-wider">
            <th class="px-4 py-3 text-left">Guest</th>
            <th class="px-4 py-3 text-left">Date &amp; Time</th>
            <th class="px-4 py-3 text-center">Guests</th>
            <th class="px-4 py-3 text-left">Contact</th>
            <th class="px-4 py-3 text-center">Status</th>
            <th class="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#5A2E18]">
          <tr v-if="!filtered.length">
            <td colspan="6" class="px-4 py-8 text-center text-[#7A5C45]">No reservations.</td>
          </tr>
          <tr v-for="r in filtered" :key="r.id" class="hover:bg-[#2A1408]">
            <td class="px-4 py-3">
              <p class="font-medium text-[#F5ECD7]">{{ r.name }}</p>
              <p v-if="r.special_requests" class="text-xs text-[#7A5C45] line-clamp-1">{{ r.special_requests }}</p>
            </td>
            <td class="px-4 py-3">
              <p class="text-[#F5ECD7]">{{ r.date }}</p>
              <p class="text-xs text-[#7A5C45]">{{ r.time }}</p>
            </td>
            <td class="px-4 py-3 text-center text-[#C8860A] font-semibold">{{ r.guests }}</td>
            <td class="px-4 py-3">
              <p class="text-xs text-[#F5ECD7]">{{ r.phone }}</p>
              <p class="text-xs text-[#7A5C45]">{{ r.email }}</p>
            </td>
            <td class="px-4 py-3 text-center">
              <select :value="r.status" @change="updateStatus(r, $event.target.value)"
                :class="['text-xs rounded-full px-2 py-1 border-0 font-medium cursor-pointer outline-none', statusClass(r.status)]">
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </td>
            <td class="px-4 py-3 text-center">
              <button @click="deleteRes(r)" class="text-[#C8A882] hover:text-red-400"><TrashIcon class="w-4 h-4" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'
import { TrashIcon } from '@heroicons/vue/24/outline'

const auth         = useAdminAuth()
const reservations = ref([])
const filterStatus = ref('all')

const filtered = computed(() =>
  filterStatus.value === 'all' ? reservations.value : reservations.value.filter(r => r.status === filterStatus.value)
)
const counts = computed(() => ({
  pending:   reservations.value.filter(r => r.status === 'pending').length,
  confirmed: reservations.value.filter(r => r.status === 'confirmed').length,
  cancelled: reservations.value.filter(r => r.status === 'cancelled').length,
}))

function statusClass(s) {
  return { pending:'bg-yellow-900/50 text-yellow-400', confirmed:'bg-green-900/50 text-green-400', cancelled:'bg-red-900/50 text-red-400' }[s] || ''
}

async function load() {
  const res = await adminApi.get('/admin/reservations')
  reservations.value = res.data.data
}

async function updateStatus(r, status) {
  await adminApi.put(`/admin/reservations/${r.id}`, { status })
  r.status = status
}

async function deleteRes(r) {
  if (!confirm('Delete this reservation?')) return
  await adminApi.delete(`/admin/reservations/${r.id}`)
  await load()
}

onMounted(load)
</script>
