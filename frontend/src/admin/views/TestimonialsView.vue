<template>
  <div>
    <h2 class="font-serif text-2xl font-bold text-[#F5ECD7] mb-6">Testimonials</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="t in testimonials" :key="t.id"
        :class="['p-5 rounded-2xl border', t.approved ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-[#2A1408] border-yellow-900/50']">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <img v-if="t.avatar" :src="t.avatar" class="w-9 h-9 rounded-full object-cover" />
            <div>
              <p class="font-semibold text-[#F5ECD7] text-sm">{{ t.name }}</p>
              <div class="flex gap-0.5">
                <span v-for="n in t.rating" :key="n" class="text-yellow-400 text-xs">&#9733;</span>
              </div>
            </div>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', t.approved ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400']">
            {{ t.approved ? 'Approved' : 'Pending' }}
          </span>
        </div>
        <p class="text-[#C8A882] text-sm italic mb-4">"{{ t.review }}"</p>
        <div class="flex gap-2">
          <button v-if="!t.approved" @click="approve(t)"
            class="flex-1 py-1.5 bg-green-800/40 hover:bg-green-700/50 text-green-400 text-xs font-semibold rounded-lg transition-colors">
            Approve
          </button>
          <button v-else @click="unapprove(t)"
            class="flex-1 py-1.5 bg-[#2A1408] hover:bg-[#3B1F0A] text-[#7A5C45] text-xs font-semibold rounded-lg transition-colors">
            Hide
          </button>
          <button @click="del(t)"
            class="py-1.5 px-3 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
      <div v-if="!testimonials.length" class="col-span-2 text-center py-12 text-[#7A5C45]">No testimonials yet.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'

const auth         = useAdminAuth()
const testimonials = ref([])

async function load() {
  const res = await adminApi.get('/admin/testimonials')
  testimonials.value = res.data.data
}

async function approve(t)   { await adminApi.put(`/admin/testimonials/${t.id}`, { approved: true });  t.approved = true }
async function unapprove(t) { await adminApi.put(`/admin/testimonials/${t.id}`, { approved: false }); t.approved = false }
async function del(t) {
  if (!confirm('Delete this review?')) return
  await adminApi.delete(`/admin/testimonials/${t.id}`)
  await load()
}

onMounted(load)
</script>
