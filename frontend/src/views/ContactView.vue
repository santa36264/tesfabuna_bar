<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-52 sm:h-72 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80" alt="Contact" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div class="text-center">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">We'd Love to Hear From You</p>
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('contact.title') }}</h1>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-14">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14">

        <!-- Left: Info -->
        <div data-aos="fade-right">
          <h2 :class="['font-serif text-3xl font-bold mb-8', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
            Get in Touch
          </h2>
          <div class="space-y-5 mb-8">
            <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4">
              <div class="w-11 h-11 bg-[#C8860A]/15 rounded-xl flex items-center justify-center flex-shrink-0 text-xl">
                {{ info.icon }}
              </div>
              <div>
                <div :class="['font-semibold text-sm mb-0.5', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
                  {{ info.label }}
                </div>
                <div :class="['text-sm leading-relaxed', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']" v-html="info.value"></div>
              </div>
            </div>
          </div>

          <!-- Opening Hours -->
          <div :class="['p-6 rounded-2xl border mb-6', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']">
            <h3 :class="['font-semibold mb-4 flex items-center gap-2', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
              🕐 {{ t('contact.hours') }}
            </h3>
            <div class="space-y-2 text-sm">
              <div v-for="row in hours" :key="row.day" class="flex justify-between">
                <span :class="themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]'">{{ row.day }}</span>
                <span :class="['font-medium', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">{{ row.time }}</span>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div class="rounded-2xl overflow-hidden h-52 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.519!2d38.763611!3d9.005401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMTkuNCJOIDM4wrA0NSc0OS4wIkU!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
              width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" title="TesfaBunna Location">
            </iframe>
          </div>
        </div>

        <!-- Right: Form -->
        <div data-aos="fade-left">
          <form @submit.prevent="sendMessage"
            :class="['p-8 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18] shadow-xl' : 'bg-white border-[#DFC9A0] shadow-lg']">
            <h3 :class="['font-serif text-2xl font-bold mb-6', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
              {{ t('contact.sendMessage') }}
            </h3>
            <div class="space-y-4">
              <div>
                <label :class="labelClass">{{ t('contact.name') }}</label>
                <input v-model="form.name" type="text" required :placeholder="t('contact.name')" :class="inputClass" />
              </div>
              <div>
                <label :class="labelClass">{{ t('reservation.email') }}</label>
                <input v-model="form.email" type="email" required placeholder="you@example.com" :class="inputClass" />
              </div>
              <div>
                <label :class="labelClass">{{ t('contact.subject') }}</label>
                <input v-model="form.subject" type="text" placeholder="How can we help?" :class="inputClass" />
              </div>
              <div>
                <label :class="labelClass">{{ t('contact.message') }}</label>
                <textarea v-model="form.message" required rows="5" placeholder="Write your message here..." :class="[inputClass, 'resize-none']"></textarea>
              </div>
            </div>
            <button type="submit" :disabled="sent"
              class="mt-6 w-full py-3 bg-[#C8860A] hover:bg-[#A36A06] disabled:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-md">
              {{ sent ? '✓ Message Sent!' : t('contact.sendMessage') }}
            </button>
          </form>
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

const { t }      = useI18n()
const themeStore = useThemeStore()
const sent       = ref(false)
const form       = reactive({ name: '', email: '', subject: '', message: '' })

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

const contactInfo = [
  { icon: '📍', label: 'Address',  value: 'Dessie, Ethiopia' },
  { icon: '📞', label: 'Phone',    value: '+251 91 162 8825' },
  { icon: '✉️', label: 'Email',    value: 'hello@tesfabunna.com<br>reservations@tesfabunna.com' },
  { icon: '💬', label: 'WhatsApp', value: '+251 91 162 8825' },
  { icon: 'T' , label: 'Telegram' ,     value : '+251 91 162 8825'},
]

const hours = [
  { day: 'Monday – Friday',   time: '11:00 AM – 11:00 PM' },
  { day: 'Saturday – Sunday', time: '10:00 AM – 12:00 AM' },
  { day: 'Public Holidays',   time: '10:00 AM – 11:00 PM' },
]

function sendMessage() {
  api.post('/contact', form).catch(() => {})
  sent.value = true
  setTimeout(() => {
    sent.value = false
    Object.keys(form).forEach(k => (form[k] = ''))
  }, 3000)
}
</script>
