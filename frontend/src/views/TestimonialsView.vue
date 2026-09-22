<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-48 sm:h-64 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="Testimonials" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/65 flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('testimonials.title') }}</h1>
          <div class="flex justify-center gap-1 mt-3">
            <span v-for="n in 5" :key="n" class="text-yellow-400 text-2xl">&#9733;</span>
          </div>
          <p class="text-[#F5ECD7]/80 mt-1">4.9 / 5.0 — Based on 200+ reviews</p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-14">

      <!-- ── Approved Reviews Grid ── -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        <div v-for="(review, i) in testimonials" :key="review.id"
          :data-aos="'fade-up'" :data-aos-delay="(i % 6) * 80"
          :class="['p-6 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']">
          <div class="flex gap-1 mb-4">
            <span v-for="n in review.rating" :key="n" class="text-yellow-400 text-lg">&#9733;</span>
            <span v-for="n in (5 - review.rating)" :key="'e'+n" class="text-gray-300 text-lg">&#9733;</span>
          </div>
          <p :class="['text-sm leading-relaxed mb-5 italic', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">
            "{{ review.review }}"
          </p>
          <div class="flex items-center gap-3 pt-4 border-t" :class="themeStore.isDark ? 'border-[#5A2E18]' : 'border-[#E8D5B7]'">
            <img v-if="review.avatar" :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full object-cover" />
            <div v-else :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white', 'bg-[#C8860A]']">
              {{ review.name?.charAt(0) }}
            </div>
            <div>
              <div :class="['font-semibold text-sm', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ review.name }}</div>
              <div :class="['text-xs', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">{{ review.date || 'Verified Guest' }}</div>
            </div>
          </div>
        </div>
        <div v-if="!testimonials.length" class="col-span-3 text-center py-12 text-[#7A5C45]">No reviews yet. Be the first!</div>
      </div>

      <!-- ── Submit a Review Form ── -->
      <div :class="['rounded-2xl border p-8', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-md']"
        data-aos="fade-up">

        <!-- Success state -->
        <div v-if="submitted" class="text-center py-6">
          <div class="text-5xl mb-3">🎉</div>
          <h3 :class="['font-serif text-2xl font-bold mb-2', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
            Thank you for your review!
          </h3>
          <p :class="['mb-6', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
            Your review has been submitted and will appear after approval.
          </p>
          <button @click="submitted = false"
            class="px-6 py-2.5 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold rounded-full transition-colors text-sm">
            Write Another Review
          </button>
        </div>

        <!-- Review form -->
        <div v-else>
          <h3 :class="['font-serif text-2xl font-bold mb-1', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
            Share Your Experience
          </h3>
          <p :class="['text-sm mb-6', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
            Visited TesfaBunna? We'd love to hear from you.
          </p>

          <form @submit.prevent="submitReview" class="space-y-5">

            <!-- Name -->
            <div>
              <label :class="labelClass">Your Name *</label>
              <input v-model="form.name" type="text" required placeholder="e.g. Selam T."
                :class="inputClass" />
            </div>

            <!-- Star rating picker -->
            <div>
              <label :class="labelClass">Rating *</label>
              <div class="flex gap-1 mt-1">
                <button
                  v-for="n in 5" :key="n"
                  type="button"
                  @click="form.rating = n"
                  @mouseover="hoverRating = n"
                  @mouseleave="hoverRating = 0"
                  :aria-label="`${n} star${n > 1 ? 's' : ''}`"
                  class="text-3xl transition-transform hover:scale-110 focus:outline-none"
                >
                  <span :class="n <= (hoverRating || form.rating) ? 'text-yellow-400' : (themeStore.isDark ? 'text-[#5A2E18]' : 'text-[#DFC9A0]')">
                    &#9733;
                  </span>
                </button>
                <span :class="['text-sm ml-2 self-center', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#7A5C45]']">
                  {{ ratingLabel }}
                </span>
              </div>
            </div>

            <!-- Review text -->
            <div>
              <label :class="labelClass">Your Review *</label>
              <textarea v-model="form.review" required rows="4" maxlength="500"
                placeholder="Tell us about your experience — the food, service, atmosphere..."
                :class="[inputClass, 'resize-none']"></textarea>
              <p :class="['text-xs mt-1 text-right', themeStore.isDark ? 'text-[#7A5C45]' : 'text-[#A0856A]']">
                {{ form.review.length }}/500
              </p>
            </div>

            <!-- Error -->
            <p v-if="submitError" class="text-sm text-red-400 bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3">
              {{ submitError }}
            </p>

            <button type="submit" :disabled="submitting || form.rating === 0"
              class="w-full py-3 bg-[#C8860A] hover:bg-[#A36A06] disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
              <svg v-if="submitting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              {{ submitting ? 'Submitting...' : 'Submit Review' }}
            </button>

            <p :class="['text-xs text-center', themeStore.isDark ? 'text-[#7A5C45]' : 'text-[#A0856A]']">
              Reviews are moderated and appear after admin approval.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { testimonials as mockTestimonials } from '@/data/mockData'
import { useApi } from '@/composables/useApi'
import api from '@/composables/useApi'

const { t }      = useI18n()
const themeStore = useThemeStore()

// Load approved reviews
const { data: testimonials, fetch } = useApi('/testimonials', mockTestimonials)
onMounted(fetch)

// Form state
const form = reactive({ name: '', rating: 0, review: '' })
const hoverRating = ref(0)
const submitting  = ref(false)
const submitted   = ref(false)
const submitError = ref(null)

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
const ratingLabel  = computed(() => ratingLabels[hoverRating.value || form.rating] || 'Select a rating')

const labelClass = computed(() =>
  `block text-sm font-medium mb-1.5 ${themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]'}`
)
const inputClass = computed(() =>
  `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#C8860A]/30 focus:border-[#C8860A] transition ${
    themeStore.isDark
      ? 'bg-[#2A1408] border-[#5A2E18] text-[#F5ECD7] placeholder-[#7A5C45]'
      : 'bg-[#FBF6EE] border-[#DFC9A0] text-[#1C1008] placeholder-[#A0856A]'
  }`
)

async function submitReview() {
  if (form.rating === 0) return
  submitting.value  = true
  submitError.value = null
  try {
    await api.post('/testimonials', {
      name:   form.name,
      rating: form.rating,
      review: form.review,
    })
    submitted.value = true
    form.name   = ''
    form.rating = 0
    form.review = ''
  } catch (err) {
    submitError.value = err.response?.data?.message
      || 'Could not submit your review. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
