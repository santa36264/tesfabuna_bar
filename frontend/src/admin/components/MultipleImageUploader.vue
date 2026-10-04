<template>
  <div class="space-y-3">
    <!-- Upload zone -->
    <div
      @dragover.prevent
      @drop.prevent="onDrop"
      @dragenter.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @click="fileInput.click()"
      :class="[
        'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer select-none transition-all',
        uploading ? 'opacity-60 pointer-events-none' : '',
        dragging  ? 'border-[#C8860A] bg-[#C8860A]/10 scale-[1.01]'
                  : 'border-[#5A2E18] hover:border-[#C8860A] hover:bg-[#C8860A]/5'
      ]"
    >
      <div v-if="uploading" class="flex flex-col items-center gap-2">
        <svg class="animate-spin h-8 w-8 text-[#C8860A]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
        <p class="text-sm text-[#C8860A]">Uploading {{ currentUpload }} of {{ totalFiles }}...</p>
        <div class="w-48 h-2 bg-[#2A1408] rounded-full overflow-hidden">
          <div class="h-full bg-[#C8860A] transition-all" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
      </div>
      <div v-else>
        <PhotoIcon class="w-10 h-10 text-[#7A5C45] mx-auto mb-2" />
        <p class="text-sm font-medium text-[#C8A882]">Click to browse or drag &amp; drop</p>
        <p class="text-xs text-[#7A5C45] mt-1">Select one or more images (PNG, JPG, WebP, GIF — max 5 MB each)</p>
      </div>
    </div>

    <!-- Hidden file input with multiple attribute -->
    <input
      ref="fileInput"
      type="file"
      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
      multiple
      class="hidden"
      @change="onFileChange"
    />

    <!-- Preview grid -->
    <div v-if="images.length > 0" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div v-for="(img, idx) in images" :key="idx" class="relative group">
        <img :src="img.src" :alt="img.alt" class="w-full aspect-square object-cover rounded-lg border border-[#5A2E18]" />
        <button @click="removeImage(idx)" type="button"
          class="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full text-white flex items-center justify-center hover:bg-red-700 transition-colors">
          <XMarkIcon class="w-3 h-3" />
        </button>
        <div class="mt-1">
          <input v-model="img.alt" placeholder="Description (optional)"
            class="w-full px-2 py-1 text-xs rounded bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A]" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-if="uploadError" class="text-xs text-red-300 bg-red-900/30 border border-red-700/60 rounded-lg px-3 py-2.5">
      <p class="font-semibold">⚠️ Upload failed</p>
      <p class="text-red-400 break-words">{{ uploadError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { adminApi } from '../stores/auth'
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ 
  modelValue: { type: Array, default: () => [] } 
})
const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const dragging = ref(false)
const uploading = ref(false)
const uploadError = ref(null)
const currentUpload = ref(0)
const totalFiles = ref(0)

const images = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const uploadProgress = computed(() => {
  if (totalFiles.value === 0) return 0
  return Math.round((currentUpload.value / totalFiles.value) * 100)
})

function removeImage(idx) {
  const newImages = [...images.value]
  newImages.splice(idx, 1)
  images.value = newImages
}

async function uploadFiles(files) {
  const fileArray = Array.from(files)
  
  // Validate files
  for (const file of fileArray) {
    if (!file.type.startsWith('image/')) {
      uploadError.value = `${file.name} is not an image file.`
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      uploadError.value = `${file.name} is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`
      return
    }
  }

  uploading.value = true
  uploadError.value = null
  dragging.value = false
  totalFiles.value = fileArray.length
  currentUpload.value = 0

  const uploadedImages = []

  try {
    for (const file of fileArray) {
      currentUpload.value++
      
      const formData = new FormData()
      formData.append('image', file)

      const res = await adminApi.post('/admin/upload', formData)
      uploadedImages.push({
        src: res.data.url,
        alt: ''
      })
    }

    // Add all uploaded images to the list
    images.value = [...images.value, ...uploadedImages]
  } catch (err) {
    console.error('[MultipleImageUploader] Upload error:', err)
    
    const serverMsg = err.response?.data?.errors?.image?.[0]
                   || err.response?.data?.message
                   || null

    if (!err.response) {
      uploadError.value = `Network error: cannot reach the server. Make sure the backend is running.`
    } else if (err.response.status === 401) {
      uploadError.value = 'Session expired. Please log out and log in again.'
    } else if (err.response.status === 422) {
      uploadError.value = serverMsg || 'Invalid file. Please try a valid image under 5 MB.'
    } else if (err.response.status === 413) {
      uploadError.value = 'File too large for the server. Maximum size is 5 MB.'
    } else {
      uploadError.value = serverMsg || `Error uploading files. Please try again.`
    }
  } finally {
    uploading.value = false
    currentUpload.value = 0
    totalFiles.value = 0
    if (fileInput.value) fileInput.value.value = ''
  }
}

function onFileChange(e) {
  const files = e.target.files
  if (files && files.length > 0) {
    uploadFiles(files)
  }
}

function onDrop(e) {
  dragging.value = false
  const files = e.dataTransfer.files
  if (files && files.length > 0) {
    uploadFiles(files)
  }
}
</script>
