<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6">
      <h2 class="font-serif text-xl sm:text-2xl font-bold text-[#F5ECD7]">Food Menu</h2>
      <button @click="openForm()" class="px-4 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
        <PlusIcon class="w-4 h-4" /> Add Item
      </button>
    </div>

    <!-- Category filter -->
    <div class="flex gap-2 flex-wrap mb-5">
      <button v-for="c in ['all',...categories]" :key="c" @click="filterCat = c"
        :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
          filterCat === c ? 'bg-[#C8860A] text-white' : 'bg-[#3B1F0A] text-[#C8A882] hover:bg-[#4A2610]']">
        {{ c }}
      </button>
    </div>

    <!-- Table -->
    <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl overflow-x-auto">
      <table class="w-full text-sm min-w-[640px]">
        <thead class="border-b border-[#5A2E18]">
          <tr class="text-[#7A5C45] text-xs uppercase tracking-wider">
            <th class="px-3 sm:px-4 py-3 text-left">Image</th>
            <th class="px-3 sm:px-4 py-3 text-left">Name</th>
            <th class="px-3 sm:px-4 py-3 text-left">Category</th>
            <th class="px-3 sm:px-4 py-3 text-right">Price</th>
            <th class="px-3 sm:px-4 py-3 text-center">Status</th>
            <th class="px-3 sm:px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#5A2E18]">
          <tr v-if="!filtered.length">
            <td colspan="6" class="px-3 sm:px-4 py-8 text-center text-[#7A5C45]">No items found.</td>
          </tr>
          <tr v-for="item in filtered" :key="item.id" class="hover:bg-[#2A1408] transition-colors">
            <td class="px-3 sm:px-4 py-3">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" />
              <div v-else class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2A1408] flex items-center justify-center">
                <PhotoIcon class="w-5 h-5 text-[#5A2E18]" />
              </div>
            </td>
            <td class="px-3 sm:px-4 py-3">
              <p class="font-medium text-[#F5ECD7] text-xs sm:text-sm">{{ item.name }}</p>
              <p class="text-xs text-[#7A5C45] line-clamp-1 max-w-[120px] sm:max-w-xs">{{ item.description }}</p>
            </td>
            <td class="px-3 sm:px-4 py-3">
              <span class="text-xs bg-[#2A1408] text-[#C8860A] px-2 py-1 rounded-full capitalize whitespace-nowrap">{{ item.category }}</span>
            </td>
            <td class="px-3 sm:px-4 py-3 text-right text-[#C8860A] font-semibold text-xs sm:text-sm whitespace-nowrap">ETB {{ item.price }}</td>
            <td class="px-3 sm:px-4 py-3 text-center">
              <button @click="toggleAvailable(item)"
                :class="['text-xs px-2 py-1 rounded-full font-medium transition-colors whitespace-nowrap',
                  item.available ? 'bg-green-900/40 text-green-400 hover:bg-green-900/60' : 'bg-red-900/40 text-red-400 hover:bg-red-900/60']">
                {{ item.available ? 'Active' : 'Hidden' }}
              </button>
            </td>
            <td class="px-3 sm:px-4 py-3">
              <div class="flex items-center justify-center gap-2">
                <button @click="openForm(item)" class="text-[#C8A882] hover:text-[#C8860A]"><PencilIcon class="w-4 h-4" /></button>
                <button @click="deleteItem(item)" class="text-[#C8A882] hover:text-red-400"><TrashIcon class="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" @click.self="showForm=false">
        <div class="bg-[#1A0F07] border border-[#5A2E18] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-5 border-b border-[#5A2E18]">
            <h3 class="font-semibold text-[#F5ECD7]">{{ editing ? 'Edit Item' : 'Add Menu Item' }}</h3>
            <button @click="showForm=false" class="text-[#7A5C45] hover:text-[#F5ECD7]"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <form @submit.prevent="save" class="p-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Name *</label>
                <input v-model="form.name" required class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" placeholder="Doro Wat" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Category *</label>
                <select v-model="form.category" required class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition">
                  <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Price (ETB) *</label>
                <input v-model.number="form.price" type="number" min="0" required class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" placeholder="350" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Calories</label>
                <input v-model.number="form.calories" type="number" min="0" class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" placeholder="580" />
              </div>
              <div class="flex items-center gap-4 pt-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="form.popular" type="checkbox" class="accent-[#C8860A]" />
                  <span class="text-sm text-[#C8A882]">Popular</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="form.available" type="checkbox" class="accent-[#C8860A]" />
                  <span class="text-sm text-[#C8A882]">Available</span>
                </label>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Description</label>
                <textarea v-model="form.description" class="w-full px-3 py-2 h-20 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" rows="2"></textarea>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Image</label>
                <ImageUploader v-model="form.image" />
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="showForm=false" class="px-4 py-2 text-sm text-[#C8A882] hover:text-[#F5ECD7]">Cancel</button>
              <button type="submit" :disabled="saving" class="px-5 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
                {{ saving ? 'Saving...' : 'Save' }}
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
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import ImageUploader from '../components/ImageUploader.vue'

const auth     = useAdminAuth()
const items    = ref([])
const showForm = ref(false)
const editing  = ref(null)
const saving   = ref(false)
const filterCat = ref('all')

const categories = ['appetizers','breakfast','lunch','dinner','burgers','pizza','pasta','desserts','vegetarian','kids']

const emptyForm = () => ({ name:'', category:'lunch', description:'', price:0, calories:null, popular:false, available:true, image:'' })
const form = ref(emptyForm())

const filtered = computed(() =>
  filterCat.value === 'all' ? items.value : items.value.filter(i => i.category === filterCat.value)
)

async function load() {
  const res = await adminApi.get('/admin/menu-items')
  items.value = res.data.data
}

function openForm(item = null) {
  editing.value = item
  form.value = item ? { ...item } : emptyForm()
  showForm.value = true
}

async function save() {
  saving.value = true
  try {
    if (editing.value) {
      await adminApi.put(`/admin/menu-items/${editing.value.id}`, form.value)
    } else {
      await adminApi.post('/admin/menu-items', form.value)
    }
    await load()
    showForm.value = false
  } finally {
    saving.value = false
  }
}

async function toggleAvailable(item) {
  await adminApi.put(`/admin/menu-items/${item.id}`, { available: !item.available })
  item.available = !item.available
}

async function deleteItem(item) {
  if (!confirm(`Delete "${item.name}"?`)) return
  await adminApi.delete(`/admin/menu-items/${item.id}`)
  await load()
}

onMounted(load)
</script>

