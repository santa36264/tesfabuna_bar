<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-serif text-2xl font-bold text-[#F5ECD7]">Blog Posts</h2>
      <button @click="openForm()" class="px-4 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl flex items-center gap-2">
        <PlusIcon class="w-4 h-4" /> New Post
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="post in posts" :key="post.id"
        class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl p-4 flex gap-4 items-start">
        <img v-if="post.image" :src="post.image" class="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="font-semibold text-[#F5ECD7]">{{ post.title }}</p>
              <p class="text-xs text-[#7A5C45] mt-0.5">{{ post.author }} &bull; {{ post.category }}</p>
            </div>
            <span :class="['text-xs px-2 py-0.5 rounded-full flex-shrink-0', post.published ? 'bg-green-900/40 text-green-400' : 'bg-[#2A1408] text-[#7A5C45]']">
              {{ post.published ? 'Published' : 'Draft' }}
            </span>
          </div>
          <p class="text-xs text-[#C8A882] mt-1 line-clamp-2">{{ post.excerpt }}</p>
          <div class="flex gap-2 mt-3">
            <button @click="openForm(post)" class="text-xs px-3 py-1 bg-[#2A1408] hover:bg-[#4A2610] text-[#C8A882] rounded-lg flex items-center gap-1">
              <PencilIcon class="w-3 h-3" /> Edit
            </button>
            <button @click="togglePublish(post)" class="text-xs px-3 py-1 bg-[#2A1408] hover:bg-[#4A2610] text-[#C8860A] rounded-lg">
              {{ post.published ? 'Unpublish' : 'Publish' }}
            </button>
            <button @click="del(post)" class="text-xs px-3 py-1 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg">Delete</button>
          </div>
        </div>
      </div>
      <div v-if="!posts.length" class="text-center py-12 text-[#7A5C45]">No blog posts yet.</div>
    </div>

    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" @click.self="showForm=false">
        <div class="bg-[#1A0F07] border border-[#5A2E18] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-5 border-b border-[#5A2E18]">
            <h3 class="font-semibold text-[#F5ECD7]">{{ editing ? 'Edit Post' : 'New Post' }}</h3>
            <button @click="showForm=false" class="text-[#7A5C45] hover:text-[#F5ECD7]"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <form @submit.prevent="save" class="p-5 space-y-4">
            <div>
              <label class="block text-xs font-medium text-[#C8A882] mb-1">Title *</label>
              <input v-model="form.title" required class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Category</label>
                <input v-model="form.category" class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" placeholder="Menu Update" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#C8A882] mb-1">Author</label>
                <input v-model="form.author" class="w-full px-3 py-2 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" placeholder="Chef Abebe" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#C8A882] mb-1">Excerpt</label>
              <textarea v-model="form.excerpt" class=" w-full px-3 py-2 h-20 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" rows="2"></textarea>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#C8A882] mb-1">Content</label>
              <textarea v-model="form.content" class="w-full px-3 py-2 h-20 rounded-lg bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition" rows="6"></textarea>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#C8A882] mb-1">Cover Image</label>
              <ImageUploader v-model="form.image" />
            </div>
            <div class="flex items-center gap-2">
              <input v-model="form.published" type="checkbox" id="pub" class="accent-[#C8860A]" />
              <label for="pub" class="text-sm text-[#C8A882] cursor-pointer">Publish immediately</label>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="showForm=false" class="px-4 py-2 text-sm text-[#C8A882]">Cancel</button>
              <button type="submit" :disabled="saving" class="px-5 py-2 bg-[#C8860A] hover:bg-[#A36A06] text-white text-sm font-semibold rounded-xl disabled:opacity-60">
                {{ saving ? 'Saving...' : 'Save Post' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'
import { PlusIcon, PencilIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import ImageUploader from '../components/ImageUploader.vue'

const auth     = useAdminAuth()
const posts    = ref([])
const showForm = ref(false)
const editing  = ref(null)
const saving   = ref(false)
const emptyForm = () => ({ title:'', category:'', author:'', excerpt:'', content:'', image:'', published:false })
const form = ref(emptyForm())

async function load() {
  const res = await adminApi.get('/admin/blog')
  posts.value = res.data.data
}

function openForm(post = null) {
  editing.value = post
  form.value = post ? { ...post } : emptyForm()
  showForm.value = true
}

async function save() {
  saving.value = true
  try {
    if (editing.value) await adminApi.put(`/admin/blog/${editing.value.id}`, form.value)
    else await adminApi.post('/admin/blog', form.value)
    await load(); showForm.value = false
  } finally { saving.value = false }
}

async function togglePublish(post) {
  await adminApi.put(`/admin/blog/${post.id}`, { published: !post.published })
  post.published = !post.published
}

async function del(post) {
  if (!confirm('Delete this post?')) return
  await adminApi.delete(`/admin/blog/${post.id}`)
  await load()
}

onMounted(load)
</script>

