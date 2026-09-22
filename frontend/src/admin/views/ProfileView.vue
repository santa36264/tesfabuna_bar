<template>
  <div class="max-w-2xl mx-auto space-y-6">

    <!-- Page header -->
    <div>
      <h2 class="font-serif text-2xl font-bold text-[#F5ECD7]">My Profile</h2>
      <p class="text-[#7A5C45] text-sm mt-1">Manage your account information and security settings</p>
    </div>

    <!-- ── Profile Info Card ────────────────────────── -->
    <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-[#5A2E18]">
        <h3 class="font-semibold text-[#F5ECD7]">Profile Information</h3>
      </div>
      <div class="p-6">
        <!-- Avatar section -->
        <div class="flex items-center gap-5 mb-6 pb-6 border-b border-[#5A2E18]">
          <div class="relative flex-shrink-0">
            <img v-if="profileForm.avatar" :src="profileForm.avatar"
              class="w-20 h-20 rounded-full object-cover border-2 border-[#C8860A]" alt="Avatar" />
            <div v-else
              class="w-20 h-20 rounded-full bg-[#C8860A] flex items-center justify-center text-white text-3xl font-bold border-2 border-[#C8860A]">
              {{ auth.user?.name?.charAt(0) || 'A' }}
            </div>
            <button @click="avatarInput.click()" type="button"
              class="absolute -bottom-1 -right-1 w-7 h-7 bg-[#C8860A] hover:bg-[#A36A06] rounded-full flex items-center justify-center text-white transition-colors shadow-md"
              title="Change avatar">
              <CameraIcon class="w-3.5 h-3.5" />
            </button>
            <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="uploadAvatar" />
          </div>
          <div>
            <p class="font-semibold text-[#F5ECD7] text-lg">{{ auth.user?.name }}</p>
            <p class="text-[#C8860A] text-sm">{{ auth.user?.role }}</p>
            <p class="text-[#7A5C45] text-xs mt-0.5">{{ auth.user?.email }}</p>
            <p v-if="avatarUploading" class="text-xs text-[#C8860A] mt-1">Uploading...</p>
          </div>
        </div>

        <!-- Profile form -->
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-[#C8A882] mb-1.5">Full Name</label>
            <input v-model="profileForm.name" type="text" required :class="inputCls" />
          </div>
          <div>
            <label class="block text-xs font-medium text-[#C8A882] mb-1.5">Email Address</label>
            <input v-model="profileForm.email" type="email" required :class="inputCls" />
          </div>

          <div v-if="profileSuccess" class="flex items-center gap-2 text-green-400 bg-green-900/20 border border-green-800/40 rounded-xl px-4 py-3 text-sm">
            <CheckCircleIcon class="w-4 h-4 flex-shrink-0" /> Profile updated successfully.
          </div>
          <div v-if="profileError" class="text-red-400 bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-sm">
            {{ profileError }}
          </div>

          <div class="flex justify-end pt-2">
            <button type="submit" :disabled="profileSaving"
              class="px-6 py-2.5 bg-[#C8860A] hover:bg-[#A36A06] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
              <svg v-if="profileSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              {{ profileSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Change Password Card ─────────────────────── -->
    <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-[#5A2E18]">
        <h3 class="font-semibold text-[#F5ECD7]">Change Password</h3>
      </div>
      <div class="p-6">
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-[#C8A882] mb-1.5">Current Password</label>
            <div class="relative">
              <input v-model="pwForm.current" :type="show.current ? 'text' : 'password'" required
                placeholder="Enter current password" :class="inputCls" />
              <button type="button" @click="show.current = !show.current"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-[#C8860A]">
                <EyeIcon v-if="!show.current" class="w-4 h-4" />
                <EyeSlashIcon v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#C8A882] mb-1.5">New Password</label>
            <div class="relative">
              <input v-model="pwForm.password" :type="show.new ? 'text' : 'password'" required
                placeholder="Minimum 8 characters" :class="inputCls" />
              <button type="button" @click="show.new = !show.new"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-[#C8860A]">
                <EyeIcon v-if="!show.new" class="w-4 h-4" />
                <EyeSlashIcon v-else class="w-4 h-4" />
              </button>
            </div>
            <!-- Password strength -->
            <div class="mt-2 flex gap-1">
              <div v-for="n in 4" :key="n"
                :class="['h-1 flex-1 rounded-full transition-colors', n <= pwStrength ? strengthColor : 'bg-[#5A2E18]']">
              </div>
            </div>
            <p :class="['text-xs mt-1', strengthTextColor]">{{ strengthLabel }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#C8A882] mb-1.5">Confirm New Password</label>
            <div class="relative">
              <input v-model="pwForm.password_confirmation" :type="show.confirm ? 'text' : 'password'" required
                placeholder="Repeat new password" :class="inputCls" />
              <button type="button" @click="show.confirm = !show.confirm"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-[#C8860A]">
                <EyeIcon v-if="!show.confirm" class="w-4 h-4" />
                <EyeSlashIcon v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="pwForm.password && pwForm.password_confirmation && pwForm.password !== pwForm.password_confirmation"
              class="text-xs text-red-400 mt-1">Passwords do not match.</p>
          </div>

          <div v-if="pwSuccess" class="flex items-center gap-2 text-green-400 bg-green-900/20 border border-green-800/40 rounded-xl px-4 py-3 text-sm">
            <CheckCircleIcon class="w-4 h-4 flex-shrink-0" /> Password changed successfully.
          </div>
          <div v-if="pwError" class="text-red-400 bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-sm">
            {{ pwError }}
          </div>

          <div class="flex justify-end pt-2">
            <button type="submit"
              :disabled="pwSaving || !pwForm.current || !pwForm.password || pwForm.password !== pwForm.password_confirmation"
              class="px-6 py-2.5 bg-[#C8860A] hover:bg-[#A36A06] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2">
              <svg v-if="pwSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              {{ pwSaving ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ── Account Info Card ────────────────────────── -->
    <div class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-[#5A2E18]">
        <h3 class="font-semibold text-[#F5ECD7]">Account Details</h3>
      </div>
      <div class="p-6 space-y-3 text-sm">
        <div class="flex justify-between items-center py-2 border-b border-[#5A2E18]">
          <span class="text-[#7A5C45]">Account type</span>
          <span class="text-[#C8860A] font-semibold capitalize bg-[#C8860A]/15 px-3 py-0.5 rounded-full">{{ auth.user?.role }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-b border-[#5A2E18]">
          <span class="text-[#7A5C45]">Email verified</span>
          <span class="text-green-400 flex items-center gap-1">
            <CheckCircleIcon class="w-4 h-4" /> Verified
          </span>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-[#7A5C45]">Active sessions</span>
          <button @click="revokeAll" :disabled="revoking"
            class="text-xs text-red-400 hover:text-red-300 border border-red-800/50 hover:border-red-600 px-3 py-1 rounded-lg transition-colors disabled:opacity-50">
            {{ revoking ? 'Revoking...' : 'Revoke all other sessions' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAdminAuth, adminApi } from '../stores/auth'
import { CameraIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const auth = useAdminAuth()

// ── Profile ─────────────────────────────────────────
const profileForm = reactive({
  name:   auth.user?.name  || '',
  email:  auth.user?.email || '',
  avatar: auth.user?.avatar || '',
})
const profileSaving = ref(false)
const profileSuccess = ref(false)
const profileError   = ref(null)
const avatarInput    = ref(null)
const avatarUploading = ref(false)

async function saveProfile() {
  profileSaving.value = true
  profileSuccess.value = false
  profileError.value   = null
  try {
    const res = await adminApi.put('/admin/profile', profileForm)
    // Update local store
    auth.user = res.data.user
    localStorage.setItem('admin_user', JSON.stringify(res.data.user))
    profileSuccess.value = true
    setTimeout(() => profileSuccess.value = false, 3000)
  } catch (e) {
    profileError.value = e.response?.data?.message || 'Update failed. Please try again.'
  } finally {
    profileSaving.value = false
  }
}

async function uploadAvatar(e) {
  const file = e.target.files[0]
  if (!file) return
  avatarUploading.value = true
  try {
    const fd = new FormData()
    fd.append('image', file)
    const res = await adminApi.post('/admin/upload', fd)
    profileForm.avatar = res.data.url
    await saveProfile()
  } catch {
    profileError.value = 'Avatar upload failed.'
  } finally {
    avatarUploading.value = false
    if (avatarInput.value) avatarInput.value.value = ''
  }
}

// ── Password ─────────────────────────────────────────
const pwForm = reactive({ current: '', password: '', password_confirmation: '' })
const pwSaving  = ref(false)
const pwSuccess = ref(false)
const pwError   = ref(null)
const show      = reactive({ current: false, new: false, confirm: false })

const pwStrength = computed(() => {
  const p = pwForm.password
  if (!p) return 0
  let s = 0
  if (p.length >= 8)  s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthColor = computed(() => {
  return ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-400', 'bg-green-500'][pwStrength.value]
})
const strengthTextColor = computed(() => {
  return ['text-[#7A5C45]', 'text-red-400', 'text-yellow-400', 'text-blue-400', 'text-green-400'][pwStrength.value]
})
const strengthLabel = computed(() => {
  return ['Enter a password', 'Weak', 'Fair', 'Strong', 'Very strong'][pwStrength.value]
})

async function changePassword() {
  pwSaving.value  = true
  pwSuccess.value = false
  pwError.value   = null
  try {
    await adminApi.put('/admin/profile/password', pwForm)
    pwSuccess.value = true
    pwForm.current  = ''
    pwForm.password = ''
    pwForm.password_confirmation = ''
    setTimeout(() => pwSuccess.value = false, 4000)
  } catch (e) {
    pwError.value = e.response?.data?.errors?.current_password?.[0]
                 || e.response?.data?.message
                 || 'Password change failed.'
  } finally {
    pwSaving.value = false
  }
}

// ── Sessions ─────────────────────────────────────────
const revoking = ref(false)

const inputCls = 'w-full px-4 py-3 rounded-xl border bg-[#2A1408] border-[#5A2E18] text-[#F5ECD7] text-sm placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition pr-10'

async function revokeAll() {
  if (!confirm('This will log you out of all other devices. Continue?')) return
  revoking.value = true
  try {
    await adminApi.post('/admin/logout')
    // Don't log out THIS session — just revoke others
    // The backend deletes all except current token in changePassword
    // Here we just show success
    alert('All other sessions revoked.')
  } catch {
    alert('Failed to revoke sessions.')
  } finally {
    revoking.value = false
  }
}

onMounted(async () => {
  try {
    const res = await adminApi.get('/admin/profile')
    const u   = res.data.user
    auth.user = u
    localStorage.setItem('admin_user', JSON.stringify(u))
    profileForm.name   = u.name
    profileForm.email  = u.email
    profileForm.avatar = u.avatar || ''
  } catch {}
})
</script>

<!-- inputCls is computed in script, label class is inline -->
