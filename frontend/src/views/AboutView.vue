<template>
  <div :class="['pt-20', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-64 sm:h-80 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80" alt="About TesfaBunna" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div class="text-center">
          <h1 class="font-serif text-4xl sm:text-5xl font-bold text-white">{{ t('nav.about') }}</h1>
          <p class="text-[#F5ECD7]/80 mt-2">Our story, our people, our passion</p>
        </div>
      </div>
    </div>

    <!-- Story -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#1A0F07]' : 'bg-[#FBF6EE]']">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-3">Est. 2012</p>
          <h2 :class="['font-serif text-4xl font-bold mb-6', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('about.title') }}</h2>
          <p :class="['leading-relaxed mb-4', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#3B1F0A]']">
            TesfaBunna Bar &amp; Restaurant was born from a dream to create a space where the richness of Ethiopian culture, cuisine, and community could be celebrated every single day.
          </p>
          <p :class="['leading-relaxed mb-4', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#3B1F0A]']">
            Founded by Tesfa Bunna in 2012 in the heart of Dessie, what started as a small coffee house has grown into one of the city's most beloved dining destinations, serving hundreds of guests daily.
          </p>
          <p :class="['leading-relaxed', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#3B1F0A]']">
            We've never forgotten our roots. Every dish is made from scratch using traditional recipes passed down through generations, elevated with modern culinary techniques.
          </p>
        </div>
        <div data-aos="fade-left" class="grid grid-cols-2 gap-4">
          <img src="/76901734_103972781063369_6198513861197299712_n.jpg" alt="Interior" class="rounded-xl w-full h-48 object-cover shadow-md" />
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" alt="Outdoor" class="rounded-xl w-full h-48 object-cover shadow-md mt-8" />
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" alt="Food" class="rounded-xl w-full h-48 object-cover shadow-md" />
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" alt="Music" class="rounded-xl w-full h-48 object-cover shadow-md mt-8" />
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section :class="['py-16 px-4', themeStore.isDark ? 'bg-[#2A1408]' : 'bg-[#F5ECD7]']">
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div :class="['p-8 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']" data-aos="fade-up">
          <div class="w-12 h-12 bg-[#C8860A]/15 rounded-xl flex items-center justify-center mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 :class="['font-serif text-2xl font-bold mb-3', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('about.mission') }}</h3>
          <p :class="['leading-relaxed', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#3B1F0A]']">
            To serve authentic Ethiopian cuisine and crafted beverages in a warm, welcoming atmosphere that honors our cultural heritage while embracing modern hospitality standards.
          </p>
        </div>
        <div :class="['p-8 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']" data-aos="fade-up" data-aos-delay="100">
          <div class="w-12 h-12 bg-[#C8860A]/15 rounded-xl flex items-center justify-center mb-4">
            <span class="text-2xl">🌟</span>
          </div>
          <h3 :class="['font-serif text-2xl font-bold mb-3', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('about.vision') }}</h3>
          <p :class="['leading-relaxed', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#3B1F0A]']">
            To become East Africa's premier dining destination, sharing the beauty of Ethiopian food culture with the world while empowering our local community.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section :class="['py-16 px-4', themeStore.isDark ? 'bg-[#1A0F07]' : 'bg-[#FBF6EE]']">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="(stat, i) in stats" :key="i"
          :class="['text-center p-6 rounded-2xl border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']"
          data-aos="zoom-in" :data-aos-delay="i * 80">
          <div class="font-serif text-4xl font-bold text-[#C8860A] mb-1">{{ stat.value }}</div>
          <div :class="['text-sm font-medium', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section :class="['py-20 px-4', themeStore.isDark ? 'bg-[#2A1408]' : 'bg-[#F5ECD7]']">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12" data-aos="fade-up">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">People</p>
          <h2 :class="['font-serif text-4xl font-bold', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('about.team') }}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(member, i) in teamMembers" :key="member.id"
            :data-aos="'fade-up'" :data-aos-delay="i * 100"
            :class="['rounded-2xl overflow-hidden text-center border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-md']">
            <div class="relative overflow-hidden h-56">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-5">
              <h3 :class="['font-semibold text-lg mb-0.5', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ member.name }}</h3>
              <p class="text-[#C8860A] text-sm font-semibold mb-2">{{ member.role }}</p>
              <p :class="['text-sm leading-relaxed', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Awards -->
    <section :class="['py-16 px-4', themeStore.isDark ? 'bg-[#1A0F07]' : 'bg-[#FBF6EE]']">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-10" data-aos="fade-up">
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Recognition</p>
          <h2 :class="['font-serif text-3xl font-bold', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ t('about.awards') }}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div v-for="(award, i) in awards" :key="i"
            :data-aos="'fade-up'" :data-aos-delay="i * 100"
            :class="['p-6 rounded-2xl text-center border', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-sm']">
            <div class="text-4xl mb-3">{{ award.icon }}</div>
            <h4 :class="['font-semibold mb-1', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ award.name }}</h4>
            <p class="text-[#C8860A] text-sm font-medium">{{ award.year }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'
import { teamMembers } from '@/data/mockData'

const { t }      = useI18n()
const themeStore = useThemeStore()

const stats = [
  { value: '2012', label: 'Established' },
  { value: '200+', label: 'Daily Guests' },
  { value: '50+',  label: 'Menu Items' },
  { value: '4.9★', label: 'Average Rating' },
]

const awards = [
  { icon: '🏆', name: 'Best Ethiopian Restaurant', year: 'Addis Food Awards 2024' },
  { icon: '🍽️', name: 'Excellence in Service',     year: 'Hospitality Ethiopia 2023' },
  { icon: '🌿', name: 'Best Vegetarian Menu',       year: 'Green Food Awards 2022' },
]
</script>
