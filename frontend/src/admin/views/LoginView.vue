<template>
  <div class="min-h-screen bg-[#1A0F07] flex items-center justify-center px-4 py-8">
<div class="w-full max-w-[400px] mx-auto">
      <!-- Logo -->
      <div class="text-center mb-6 sm:mb-8">
        <img src="/logo.png" alt="TesfaBunna" class="h-16 sm:h-20 w-auto object-contain mx-auto mb-2 sm:mb-3" />
        <h1 class="font-serif text-xl sm:text-2xl font-bold text-[#F5ECD7]">Admin Panel</h1>
        <p class="text-[#7A5C45] text-xs sm:text-sm mt-1">Sign in to manage your restaurant</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin"
        class="bg-[#3B1F0A] border border-[#5A2E18] rounded-2xl p-6 sm:p-8 shadow-2xl">

        <div class="space-y-4 sm:space-y-5">
          <div>
            <label class="block text-xs sm:text-sm font-medium text-[#D4B896] mb-1.5">Email</label>
            <input v-model="email" type="email" required
              placeholder="user@example.com"
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition text-sm" />
          </div>
          <div>
            <label class="block text-xs sm:text-sm font-medium text-[#D4B896] mb-1.5">Password</label>
            <div class="relative">
              <input v-model="password" :type="showPw ? 'text' : 'password'" required
                placeholder="Enter your password"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#2A1408] border border-[#5A2E18] text-[#F5ECD7] placeholder-[#7A5C45] focus:outline-none focus:border-[#C8860A] transition text-sm pr-11 sm:pr-12" />
              <button type="button" @click="showPw = !showPw"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C45] hover:text-[#C8860A]">
                <EyeIcon v-if="!showPw" class="w-4 h-4 sm:w-5 sm:h-5" />
                <EyeSlashIcon v-else class="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-if="auth.error" class="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-900/40 border border-red-700 rounded-xl text-red-300 text-xs sm:text-sm">
          {{ auth.error }}
        </div>

        <button type="submit" :disabled="auth.loading"
          class="mt-5 sm:mt-6 w-full py-2.5 sm:py-3 bg-[#C8860A] hover:bg-[#A36A06] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
          <svg v-if="auth.loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          {{ auth.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="text-center text-[#5A3820] text-xs mt-6">
        This panel is for authorized staff only.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminAuth } from '../stores/auth'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const auth     = useAdminAuth()
const router   = useRouter()
const email    = ref('')
const password = ref('')
const showPw   = ref(false)

async function handleLogin() {
  const ok = await auth.login(email.value, password.value)
  if (ok) router.push({ name: 'AdminDashboard' })
}
</script>
