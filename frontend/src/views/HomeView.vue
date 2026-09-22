<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">

      <!-- -- Video Background ---------------------------------- -->
      <div class="absolute inset-0 z-0">
        <video
          ref="heroVideo"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          class="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          @canplay="videoReady = true"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-preparing-food-in-restaurant-kitchen-34607-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-waiter-pouring-wine-in-a-restaurant-42953-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-people-eating-at-a-restaurant-table-42989-large.mp4" type="video/mp4" />
        </video>
        <img
          v-show="!videoReady"
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90"
          alt="TesfaBunna Restaurant"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/55"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p data-aos="fade-up" class="text-[#C8860A] text-sm font-semibold tracking-[4px] uppercase mb-4">Welcome to</p>
        <h1 data-aos="fade-up" data-aos-delay="100" class="font-serif text-5xl sm:text-7xl font-bold text-white mb-4 leading-tight">
          TesfaBunna
        </h1>
        <p data-aos="fade-up" data-aos-delay="200" class="text-white/90 text-xl sm:text-2xl font-light mb-3">Bar & Restaurant</p>
        <p data-aos="fade-up" data-aos-delay="300" class="text-[#F5ECD7]/80 text-lg mb-10 max-w-xl mx-auto">{{ t('hero.slogan') }}</p>
        <div data-aos="fade-up" data-aos-delay="400" class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/reservation" class="px-8 py-4 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg">
            {{ t('hero.reserve') }}
          </RouterLink>
          <RouterLink to="/menu" class="px-8 py-4 bg-[#F5ECD7]/10 hover:bg-[#F5ECD7]/20 backdrop-blur-sm text-white font-semibold rounded-full text-lg border border-[#F5ECD7]/40 transition-all hover:scale-105">
            {{ t('hero.viewMenu') }}
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
        <span class="text-xs tracking-widest uppercase">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </section>

    <!-- Happy Hour Banner -->
    <section class="bg-[#C8860A] py-4">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-white font-semibold text-sm sm:text-base">
          🍹 <strong>{{ t('home.happyHour') }}:</strong> {{ t('home.happyHourDesc') }}
        </p>
      </div>
    </section>

    <!-- Featured Dishes - horizontal scroll slider -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#2A1408]' : 'bg-[#F5ECD7]']">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-10" data-aos="fade-up">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Our Specialties</p>
          <h2 :class="['font-serif text-4xl font-bold', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('home.featuredDishes') }}</h2>
          <p :class="['mt-3 max-w-xl mx-auto', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">Authentic Ethiopian flavors crafted with love and tradition</p>
        </div>

        <!-- Slider -->
        <div class="relative" data-aos="fade-up" data-aos-delay="100">
          <!-- Scroll buttons -->
          <button @click="scrollSlider('left')"
            :class="['absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors hidden sm:flex',
              themeStore.isDark ? 'bg-[#3B1F0A] text-white hover:bg-[#C8860A]' : 'bg-white text-[#3B1F0A] hover:bg-[#C8860A] hover:text-white']"
            aria-label="Previous">
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <button @click="scrollSlider('right')"
            :class="['absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors hidden sm:flex',
              themeStore.isDark ? 'bg-[#3B1F0A] text-white hover:bg-[#C8860A]' : 'bg-white text-[#3B1F0A] hover:bg-[#C8860A] hover:text-white']"
            aria-label="Next">
            <ChevronRightIcon class="w-5 h-5" />
          </button>

          <!-- Scrollable track -->
          <div ref="sliderRef"
            class="flex gap-5 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory scrollbar-hide">
            <div
              v-for="(dish, i) in featuredDishes"
              :key="dish.id"
              :class="['snap-start flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group border',
                themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0]']"
            >
              <div class="relative overflow-hidden h-44">
                <img :src="dish.image" :alt="dish.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span v-if="dish.popular" class="absolute top-2 left-2 bg-[#C8860A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">? Popular</span>
                <span class="absolute bottom-2 right-2 bg-white/90 text-[#C8860A] text-sm font-bold px-3 py-1 rounded-full shadow">ETB {{ dish.price }}</span>
              </div>
              <div class="p-4">
                <h3 :class="['font-semibold text-base mb-1 leading-tight', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ dish.name }}</h3>
                <p :class="['text-xs mb-3 line-clamp-2 leading-relaxed', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">{{ dish.description }}</p>
                <DietaryIcons :tags="dish.dietary || []" />
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-10" data-aos="fade-up">
          <RouterLink to="/menu" class="inline-flex items-center gap-2 px-8 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full transition-colors shadow-md">
            View Full Menu
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- About Teaser -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#1A0F07]' : 'bg-[#FBF6EE]']">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80" alt="Restaurant interior" class="rounded-2xl w-full object-cover h-96 lg:h-[500px] shadow-xl" />
            <div class="absolute -bottom-6 -right-6 bg-[#C8860A] text-white p-6 rounded-2xl shadow-xl hidden lg:block">
              <div class="text-4xl font-serif font-bold">8+</div>
              <div class="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>
        </div>
        <div data-aos="fade-left">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-3">Our Story</p>
          <h2 :class="['font-serif text-4xl font-bold mb-6 leading-tight', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
            A Place Where Culture Meets Cuisine
          </h2>
          <p :class="['text-lg leading-relaxed mb-4', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">
            Founded in 2012, TesfaBunna Bar & Restaurant has been a cornerstone of Dessie's dining scene, bringing together authentic Ethiopian flavors with a warm, modern atmosphere.
          </p>
          <p :class="['leading-relaxed mb-8', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">
            From our traditional coffee ceremonies to our craft cocktail bar, every detail is crafted to give you an unforgettable experience.
          </p>
          <!-- Why choose us bullets -->
          <ul class="space-y-3 mb-8">
            <li v-for="point in whyUs" :key="point.title" class="flex items-start gap-3">
              <span class="text-xl mt-0.5">{{ point.icon }}</span>
              <div>
                <span :class="['font-semibold text-sm ', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ point.title }}:</span>
                <span :class="['text-sm ml-1', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">{{ point.desc }}</span>
              </div>
            </li>
          </ul>
          <RouterLink to="/about" class="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold rounded-full transition-colors">
            Learn Our Story
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Cocktails -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#2A1408]' : 'bg-[#F5ECD7]']">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Crafted for You</p>
          <h2 :class="['font-serif text-4xl font-bold', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('home.featuredCocktails') }}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="(drink, i) in featuredCocktails"
            :key="drink.id"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 100"
            :class="['rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group border',
              themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0]']"
          >
            <div class="relative overflow-hidden h-48">
              <img :src="drink.image" :alt="drink.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <span class="absolute bottom-3 right-3 bg-white/90 text-[#C8860A] text-sm font-bold px-3 py-1 rounded-full">ETB {{ drink.price }}</span>
            </div>
            <div class="p-5">
              <h3 :class="['font-semibold text-lg mb-1.5', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ drink.name }}</h3>
              <p :class="['text-sm leading-relaxed', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">{{ drink.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-10" data-aos="fade-up">
          <RouterLink to="/drinks" class="inline-flex items-center gap-2 px-8 py-3 bg-[#C8860A] hover:bg-[#A36A06] text-white font-semibold rounded-full transition-colors shadow-md">
            Explore Bar Menu
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#1A0F07]' : 'bg-[#FBF6EE]']">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Atmosphere</p>
          <h2 :class="['font-serif text-4xl font-bold', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('home.galleryPreview') }}</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(img, i) in galleryPreview"
            :key="img.id"
            :data-aos="'zoom-in'"
            :data-aos-delay="i * 80"
            class="relative overflow-hidden rounded-xl group aspect-square"
          >
            <img :src="img.src" :alt="img.alt" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span class="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium text-sm">View</span>
            </div>
          </div>
        </div>
        <div class="text-center mt-10" data-aos="fade-up">
          <RouterLink to="/gallery" class="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold rounded-full transition-colors">
            View Full Gallery
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Testimonials Preview -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#2A1408]' : 'bg-[#F5ECD7]']">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Reviews</p>
          <h2 :class="['font-serif text-4xl font-bold', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('home.reviews') }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(review, i) in featuredReviews"
            :key="review.id"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 120"
            :class="['p-6 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-md']"
          >
            <div class="flex gap-1 mb-4">
              <span v-for="n in review.rating" :key="n" class="text-yellow-400 text-lg">★</span>
            </div>
            <p :class="['text-sm leading-relaxed mb-5 italic', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#2A1208]']">"{{ review.review }}"</p>
            <div class="flex items-center gap-3 pt-4 border-t" :class="themeStore.isDark ? 'border-[#5A2E18]' : 'border-[#DFC9A0]'">
              <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <div :class="['font-semibold text-sm', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ review.name }}</div>
                <div :class="['text-xs', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#C8A882]']">{{ review.date }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-10" data-aos="fade-up">
          <RouterLink to="/testimonials" class="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold rounded-full transition-colors">
            Read All Reviews
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-24 px-4 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=1920&q=80" alt="Reserve a table" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/70"></div>
      </div>
      <div class="relative z-10 text-center max-w-2xl mx-auto" data-aos="zoom-in">
        <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Ready for an Unforgettable Evening?</h2>
        <p class="text-[#F5ECD7]/80 text-lg mb-8">Reserve your table today and let us take care of the rest.</p>
        <RouterLink to="/reservation" class="inline-flex items-center gap-2 px-10 py-4 bg-[#C8860A] hover:bg-[#A36A06] text-white text-lg font-semibold rounded-full transition-all hover:scale-105">
          {{ t('hero.reserve') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { menuItems as mockMenu, drinkItems as mockDrinks, testimonials as mockTestimonials, galleryImages as mockGallery } from '@/data/mockData'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import DietaryIcons from '@/components/ui/DietaryIcons.vue'
import { useApi } from '@/composables/useApi'

const { t }      = useI18n()
const themeStore = useThemeStore()
const sliderRef  = ref(null)
const heroVideo  = ref(null)
const videoReady = ref(false)

const featuredDishes    = ref([])
const featuredCocktails = ref([])
const featuredReviews   = ref([])
const galleryPreview    = ref([])

const { data: menuData,    fetch: fetchMenu    } = useApi('/menu-items',   mockMenu)
const { data: drinkData,   fetch: fetchDrinks  } = useApi('/drinks',       mockDrinks)
const { data: reviewData,  fetch: fetchReviews } = useApi('/testimonials', mockTestimonials)
const { data: galleryData, fetch: fetchGallery } = useApi('/gallery',      mockGallery)

onMounted(async () => {
  if (heroVideo.value) {
    heroVideo.value.muted = true
    heroVideo.value.play().catch(() => {})
  }
  await Promise.all([fetchMenu(), fetchDrinks(), fetchReviews(), fetchGallery()])
  featuredDishes.value    = menuData.value.filter(i => i.popular).slice(0, 8)
  featuredCocktails.value = drinkData.value.filter(d => d.category === 'cocktails').slice(0, 3)
  featuredReviews.value   = reviewData.value.slice(0, 3)
  galleryPreview.value    = galleryData.value.slice(0, 8)
})

function scrollSlider(dir) {
  if (!sliderRef.value) return
  sliderRef.value.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
}

const whyUs = [
  { icon: '🌿', title: 'Superior Quality Cuisine', desc: 'Fresh ingredients sourced daily from local Ethiopian farms and markets.' },
  { icon: '🤝', title: 'Exceptional Service',      desc: 'Warm hospitality delivered by a team that treats every guest like family.' },
  { icon: '🎶', title: 'Live Events & Catering',   desc: 'From intimate celebrations to large corporate events - we handle it all.' },
]
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
