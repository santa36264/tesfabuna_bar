<template>
  <div :class="['pt-20 min-h-screen', themeStore.isDark ? 'bg-[#1A0F07] text-[#F5ECD7]' : 'bg-[#FBF6EE] text-[#1C1008]']">

    <!-- Hero -->
    <div class="relative h-40 sm:h-56 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&q=80" alt="QR Menu" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/65 flex items-center justify-center text-center">
        <div>
          <p class="text-[#C8860A] text-sm font-semibold tracking-[3px] uppercase mb-2">Scan & Explore</p>
          <h1 class="font-serif text-3xl sm:text-5xl font-bold text-white">QR Menu</h1>
        </div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-14 text-center">
      <p :class="['text-lg mb-10 max-w-lg mx-auto', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">
        Scan the QR code below with your phone camera to instantly open our full menu. No app required.
      </p>

      <!-- QR codes grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div v-for="qr in qrCodes" :key="qr.label"
          :class="['p-8 rounded-2xl border flex flex-col items-center gap-4', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-white border-[#DFC9A0] shadow-md']"
          data-aos="zoom-in">
          <canvas :ref="el => setCanvas(el, qr)" class="rounded-xl"></canvas>
          <div>
            <h3 :class="['font-semibold text-lg mb-1', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">{{ qr.label }}</h3>
            <p :class="['text-sm', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#3B1F0A]']">{{ qr.desc }}</p>
          </div>
          <a :href="qr.url" target="_blank" rel="noopener" class="text-xs font-semibold text-[#C8860A] hover:underline">
            Open Link →
          </a>
          <button @click="downloadQR(qr)"
            class="text-xs font-semibold px-4 py-2 rounded-full border border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white transition-colors">
            Download QR
          </button>
        </div>
      </div>

      <!-- Usage tip -->
      <div :class="['p-6 rounded-2xl border text-left', themeStore.isDark ? 'bg-[#3B1F0A] border-[#5A2E18]' : 'bg-[#F5ECD7] border-[#E8D5B7]']">
        <h3 :class="['font-semibold mb-3 flex items-center gap-2', themeStore.isDark ? 'text-[#F5ECD7]' : 'text-[#1C1008]']">
          📱 How to use
        </h3>
        <ol :class="['space-y-2 text-sm list-decimal list-inside', themeStore.isDark ? 'text-[#D4B896]' : 'text-[#1C1008]']">
          <li>Open your phone camera (iOS or Android).</li>
          <li>Point it at the QR code above.</li>
          <li>Tap the notification to open the menu in your browser.</li>
          <li>No app download needed.</li>
        </ol>
      </div>

      <p :class="['mt-8 text-sm', themeStore.isDark ? 'text-[#C8A882]' : 'text-[#5A3820]']">
        Download and print the QR code to place on your table tents, receipts, or promotional materials.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Map of label → canvas element refs
const canvasRefs = {}
const baseUrl = window.location.origin

const qrCodes = [
  { id: 'food',   label: 'Food Menu',    desc: 'Browse all Ethiopian dishes by category',  url: `${baseUrl}/menu` },
  { id: 'drinks', label: 'Bar & Drinks', desc: 'Cocktails, coffee, beer, wine and more',    url: `${baseUrl}/drinks` },
]

function setCanvas(el, qr) {
  if (el) canvasRefs[qr.id] = el
}

function generateQRCodes() {
  qrCodes.forEach(qr => {
    const canvas = canvasRefs[qr.id]
    if (!canvas) return
    QRCode.toCanvas(canvas, qr.url, { width: 200, margin: 2, color: { dark: '#1A0F07', light: '#ffffff' } })
  })
}

function downloadQR(qr) {
  const canvas = canvasRefs[qr.id]
  if (!canvas) return
  const link = document.createElement('a')
  link.download = `tesfabunna-${qr.id}-qr.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

onMounted(() => setTimeout(generateQRCodes, 100))
</script>
