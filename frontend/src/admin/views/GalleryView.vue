<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-serif text-2xl font-bold text-[#F5ECD7]">Gallery</h2>
      <button @click="openForm()" class="px-4 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl flex items-center gap-2">
        <PlusIcon class="w-4 h-4" /> Add Image
      </button>
    </div>

    <div class="flex gap-2 flex-wrap mb-5">
      <button v-for="c in ['all',...categories]" :key="c" @click="filterCat = c"
        :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
          filterCat === c ? 'bg-[#C8860A] text-white' : 'bg-[#3B1F0A] text-[#C8A882] hover:bg-[#4A2610]']">
        {{ c }}
      </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="img in filtered" :key="img.id"
        class="relative group rounded-xl overflow-hidden aspect-square border border-[#5A2E18]">
        <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
          <p class="text-white text-xs text-center">{{ img.alt }}</p>
          <span class="text-xs bg-[#C8860A] text-white px-2 py-0.5 rounded-full">{{ img.category }}</span>
          <div class="flex gap-2 mt-1">
            <button @click="toggleActive(img)"
              :class="['text-xs px-2 py-1 rounded-full', img.active ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300']">
              {{ img.active ? 'Visible' : 'Hidden' }}
            </button>
            <button @click="deleteImage(img)" class="text-xs px-2 py-1 bg-red-800 text-white rounded-full hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-if="!filtered.length" class="col-span-4 text-center py-12 text-[#7A5C45]">No images yet.</div>
    </div>

    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" @click.self="showForm=false">
        <div class="bg-[#1A0F07] border border-[#5A2E18] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-5 border-b border-[#5A2E18] sticky top-0 bg-[#1A0F07] z-10">
            <h3 class="font-semibold text-[#F5ECD7]">Add Gallery Images</h3>
            <button @click="showForm=false" class="text-[#7A5C45] hover:text-[#F5ECD7]"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <form @submit.prevent="save" class="p-5 space-y-4">
            <div>
              <label class="block text-xs font-medium text-[#C8A882] mb-1">Category *</label>
              <select v-model="form.category" required class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition">
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#C8A882] mb-2">Select Images</label>
              <MultipleImageUploader v-model="form.images" />
            </div>
            <div class="flex justify-end gap-3 pt-2 border-t border-[#5A2E18]">
              <button type="button" @click="showForm=false" class="px-4 py-2 text-sm text-[#C8A882]">Cancel</button>
              <button type="submit" :disabled="saving || form.images.length === 0" class="px-5 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl disabled:opacity-60">
                {{ saving ? 'Saving...' : `Add ${form.images.length} Image${form.images.length !== 1 ? 's' : ''} to Gallery` }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import MultipleImageUploader from '../components/MultipleImageUploader.vue'

const auth      = useAdminAuth()
const images    = ref([])
const showForm  = ref(false)
const saving    = ref(false)
const filterCat = ref('all')
const categories = ['interior','outdoor','food','drinks','bar','music','staff']
const form = ref({ category: 'food', images: [] })

const filtered = computed(() =>
  filterCat.value === 'all' ? images.value : images.value.filter(i => i.category === filterCat.value)
)

async function load() {
  const res = await adminApi.get('/admin/gallery')
  images.value = res.data.data
}

function openForm() {
  form.value = { category: 'food', images: [] }
  showForm.value = true
}

async function save() {
  if (form.value.images.length === 0) return
  
  saving.value = true
  try {
    // Upload all images to the gallery
    for (const img of form.value.images) {
      await adminApi.post('/admin/gallery', {
        category: form.value.category,
        alt: img.alt || '',
        src: img.src,
        active: true
      })
    }
    await load()
    showForm.value = false
  } finally { 
    saving.value = false 
  }
}

async function toggleActive(img) {
  await adminApi.put(`/admin/gallery/${img.id}`, { active: !img.active })
  img.active = !img.active
}

async function deleteImage(img) {
  if (!confirm('Delete this image from gallery?')) return
  await adminApi.delete(`/admin/gallery/${img.id}`)
  await load()
}

onMounted(load)
</script>

