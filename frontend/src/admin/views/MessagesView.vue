<template>
  <div>
    <h2 class="font-serif text-2xl font-bold text-[#F5ECD7] mb-6">Contact Messages</h2>
    <div class="space-y-3">
      <div v-for="m in messages" :key="m.id"
        :class="['p-5 rounded-2xl border cursor-pointer transition-colors', m.read ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-[#2A1408] border-[#C8860A]/40']"
        @click="view(m)">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-semibold text-[#F5ECD7] text-sm flex items-center gap-2">
              {{ m.name }}
              <span v-if="!m.read" class="w-2 h-2 bg-[#C8860A] rounded-full"></span>
            </p>
            <p class="text-xs text-[#C8860A]">{{ m.email }}</p>
          </div>
          <button @click.stop="del(m)" class="text-[#C8A882] hover:text-red-400 ml-3"><TrashIcon class="w-4 h-4" /></button>
        </div>
        <p class="text-sm font-medium text-[#D4B896] mt-2">{{ m.subject || 'No subject' }}</p>
        <p class="text-xs text-[#7A5C45] mt-1 line-clamp-2">{{ m.message }}</p>
      </div>
      <div v-if="!messages.length" class="text-center py-12 text-[#7A5C45]">No messages yet.</div>
    </div>

    <!-- Message detail modal -->
    <Teleport to="body">
      <div v-if="selected" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" @click.self="selected=null">
        <div class="bg-[#1A0F07] border border-[#5A2E18] rounded-2xl w-full max-w-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-[#F5ECD7]">Message from {{ selected.name }}</h3>
            <button @click="selected=null" class="text-[#7A5C45] hover:text-[#F5ECD7]"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <div class="space-y-2 mb-4 text-sm">
            <p><span class="text-[#7A5C45]">Email:</span> <span class="text-[#C8860A]">{{ selected.email }}</span></p>
            <p><span class="text-[#7A5C45]">Subject:</span> <span class="text-[#F5ECD7]">{{ selected.subject || 'None' }}</span></p>
          </div>
          <div class="bg-[#2A1408] rounded-xl p-4 text-sm text-[#D4B896] leading-relaxed whitespace-pre-wrap">
            {{ selected.message }}
          </div>
          <div class="flex justify-end mt-4 gap-2">
            <a :href="`mailto:${selected.email}`" class="px-4 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl">
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'
import { TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const auth     = useAdminAuth()
const messages = ref([])
const selected = ref(null)

async function load() {
  const res = await adminApi.get('/admin/messages')
  messages.value = res.data.data
}

async function view(m) {
  if (!m.read) {
    await adminApi.get(`/admin/messages/${m.id}`)
    m.read = true
  }
  selected.value = m
}

async function del(m) {
  if (!confirm('Delete this message?')) return
  await adminApi.delete(`/admin/messages/${m.id}`)
  await load()
}

onMounted(load)
</script>
