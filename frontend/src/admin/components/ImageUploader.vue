<template>
  <div class="space-y-2">
    <!-- Current image preview -->
    <div v-if="modelValue" class="relative inline-block">
      <img :src="modelValue" alt="Preview"
        class="h-36 w-auto rounded-xl object-cover border border-[#5A2E18]" />
      <button @click="clear" type="button"
        class="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full text-white flex items-center justify-center hover:bg-red-700 transition-colors">
        <XMarkIcon class="w-3 h-3" />
      </button>
    </div>

    <!-- Upload zone (shown when no image) -->
    <div v-else
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
        <p class="text-sm text-[#C8860A]">Uploading...</p>
      </div>
      <div v-else>
        <PhotoIcon class="w-10 h-10 text-[#7A5C45] mx-auto mb-2" />
        <p class="text-sm font-medium text-[#C8A882]">Click to browse or drag &amp; drop</p>
        <p class="text-xs text-[#7A5C45] mt-1">PNG, JPG, WebP, GIF — max 5 MB</p>
      </div>
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
      class="hidden"
      @change="onFileChange"
    />

    <!-- Error (shown inline, not overlapping buttons) -->
    <div v-if="uploadError" class="text-xs text-red-300 bg-red-900/30 border border-red-700/60 rounded-lg px-3 py-2.5 space-y-0.5">
      <p class="font-semibold">⚠️ Upload failed</p>
      <p class="text-red-400 break-words">{{ uploadError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminAuth } from '../stores/auth'
import { adminApi } from '../stores/auth'
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit  = defineEmits(['update:modelValue'])

const auth        = useAdminAuth()
const fileInput   = ref(null)
const dragging    = ref(false)
const uploading   = ref(false)
const uploadError = ref(null)

function clear() {
  emit('update:modelValue', '')
  uploadError.value = null
}

async function uploadFile(file) {
  // Client-side validation
  if (!file.type.startsWith('image/')) {
    uploadError.value = 'Please select an image file (PNG, JPG, WebP or GIF).'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`
    return
  }

  uploading.value   = true
  uploadError.value = null
  dragging.value    = false

  try {
    const formData = new FormData()
    formData.append('image', file)

    // Do NOT set Content-Type manually — let the browser set it with the correct boundary
    const res = await adminApi.post('/admin/upload', formData)
    emit('update:modelValue', res.data.url)
  } catch (err) {
    // Log full error for easier debugging
    console.error('[ImageUploader] Upload error:', err.response?.status, err.response?.data, err.message)

    const serverMsg = err.response?.data?.errors?.image?.[0]
                   || err.response?.data?.message
                   || null

    if (!err.response) {
      // Network error — backend not reachable
      uploadError.value = `Network error: cannot reach the server (${err.message}). Make sure the backend is running on port 8000.`
    } else if (err.response.status === 401) {
      uploadError.value = 'Session expired. Please log out and log in again.'
    } else if (err.response.status === 403) {
      uploadError.value = 'Permission denied (403). Make sure you are logged in as an admin.'
    } else if (err.response.status === 422) {
      uploadError.value = serverMsg || 'Invalid file. Please try a valid PNG, JPG, WebP or GIF under 5 MB.'
    } else if (err.response.status === 413) {
      uploadError.value = 'File too large for the server. Maximum size is 5 MB.'
    } else if (err.response.status === 500) {
      uploadError.value = serverMsg || `Server error (500). Check the Laravel log for details.`
    } else {
      uploadError.value = serverMsg || `Unexpected error (${err.response.status}). Please try again.`
    }
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) uploadFile(file)
}

function onDrop(e) {
  dragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) uploadFile(file)
}
</script>
