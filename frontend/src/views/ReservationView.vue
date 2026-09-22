<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-52 sm:h-72 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="Reservation" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/65 flex items-center justify-center text-center">
        <div>
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Book Your Table</p>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('reservation.title') }}</h1>
          <p class="text-[#F5ECD7]/80 mt-2">{{ t('reservation.subtitle') }}</p>
        </div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-14">

      <!-- Success State -->
      <div v-if="submitted" data-aos="zoom-in" class="text-center py-16">
        <div class="text-6xl mb-5">🎉</div>
        <h2 class="font-serif text-3xl font-bold text-[#C8860A] mb-3">Reservation Confirmed!</h2>
        <p :class="['text-lg mb-2', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">
          Thank you, <strong>{{ form.name }}</strong>!
        </p>
        <p :class="['mb-8 max-w-md mx-auto', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#2A1208]']">
          We've reserved a table for <strong>{{ form.guests }}</strong> guest{{ form.guests > 1 ? 's' : '' }}
          on <strong>{{ form.date }}</strong> at <strong>{{ form.time }}</strong>.
          A confirmation will be sent to <strong>{{ form.email }}</strong>.
        </p>
        <button @click="resetForm" class="px-8 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full transition-colors shadow-md">
          Make Another Reservation
        </button>
      </div>

      <!-- Booking Form -->
      <form v-else @submit.prevent="submitReservation" data-aos="fade-up"
        :class="['rounded-2xl p-8 border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18] shadow-xl' : 'bg-white border-[#DFC9A0] shadow-lg']">
        <h2 :class="['font-serif text-2xl font-bold mb-6', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
          Book Your Experience
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label :class="labelClass">{{ t('reservation.date') }} *</label>
            <input v-model="form.date" type="date" required :min="today" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">{{ t('reservation.time') }} *</label>
            <select v-model="form.time" required :class="inputClass">
              <option value="" disabled>Select time</option>
              <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">{{ t('reservation.guests') }} *</label>
            <select v-model="form.guests" required :class="inputClass">
              <option value="" disabled>Select guests</option>
              <option v-for="n in 20" :key="n" :value="n">{{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">{{ t('reservation.name') }} *</label>
            <input v-model="form.name" type="text" required :placeholder="t('reservation.name')" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">{{ t('reservation.phone') }} *</label>
            <input v-model="form.phone" type="tel" required placeholder="+251 91 162 8825" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">{{ t('reservation.email') }} *</label>
            <input v-model="form.email" type="email" required placeholder="you@example.com" :class="inputClass" />
          </div>
          <div class="sm:col-span-2">
            <label :class="labelClass">{{ t('reservation.special') }}</label>
            <textarea v-model="form.special" rows="3"
              placeholder="Allergies, special occasions, accessibility needs, seating preference..."
              :class="[inputClass, 'resize-none']"></textarea>
          </div>
        </div>

        <button type="submit" :disabled="loading"
          class="mt-7 w-full py-4 bg-[#C8860A] hover:bg-[#A36A06] disabled:opacity-60 text-white font-semibold text-lg rounded-xl transition-colors shadow-md">
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Confirming...
          </span>
          <span v-else>{{ t('reservation.submit') }}</span>
        </button>
        <p :class="['text-center text-xs mt-4', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#5A3820]']">
          We'll confirm within 30 minutes. For same-day bookings call
          <a href="tel:+251911628825" class="text-[#C8860A] hover:underline font-medium">+251 91 162 8825</a>
        </p>
      </form>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div v-for="info in infoCards" :key="info.label"
          :class="['p-5 rounded-xl text-center border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']"
          data-aos="fade-up">
          <div class="text-2xl mb-2">{{ info.icon }}</div>
          <div :class="['font-semibold text-sm mb-1', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ info.label }}</div>
          <div :class="['text-xs', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">{{ info.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import api from '@/composables/useApi'

const { t } = useI18n()
const themeStore = useThemeStore()
const loading   = ref(false)
const submitted = ref(false)

const today = computed(() => new Date().toISOString().split('T')[0])

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
]

const form = reactive({ date: '', time: '', guests: '', name: '', phone: '', email: '', special: '' })

const labelClass = computed(() =>
  `block text-sm font-medium mb-1.5 ${themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]'}`
)
const inputClass = computed(() =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#C8860A]/30 focus:border-[#C8860A] transition ${
    themeStore.isDark
      ? 'bg-[#2A1408] border-[#5A2E18] text-[#F5ECD7] placeholder-[#7A5C45]'
      : 'bg-white border-[#DFC9A0] text-[#1C1008] placeholder-[#A0856A]'
  }`
)

function submitReservation() {
  loading.value = true
  api.post('/reservations', form)
    .then(() => { loading.value = false; submitted.value = true })
    .catch(() => { loading.value = false; submitted.value = true })
}
function resetForm() {
  submitted.value = false
  Object.keys(form).forEach(k => (form[k] = ''))
}

const infoCards = [
  { icon: '📞', label: 'Call Us',      value: '+251 91 162 8825' },
  { icon: '⏰', label: 'Open Daily',   value: '11:00 AM – 12:00 AM' },
  { icon: '👥', label: 'Group Dining', value: 'Up to 40 guests' },
]
</script>
