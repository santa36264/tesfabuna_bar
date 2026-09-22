<template>
  <div v-if="tags.length" class="flex flex-wrap gap-1">
    <span
      v-for="tag in tags"
      :key="tag"
      :title="dietaryMap[tag].label"
      :class="['inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full', dietaryMap[tag].classes]"
    >
      {{ dietaryMap[tag].icon }} {{ dietaryMap[tag].label }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  tags: { type: Array, default: () => [] },
})

const dietaryMap = {
  veg:   { icon: '🌱', label: 'Vegetarian', classes: 'bg-green-100 text-green-700' },
  vegan: { icon: '🌿', label: 'Vegan',      classes: 'bg-emerald-100 text-emerald-700' },
  gf:    { icon: '🌾', label: 'Gluten-Free', classes: 'bg-yellow-100 text-yellow-700' },
  spicy: { icon: '🌶️', label: 'Spicy',      classes: 'bg-red-100 text-red-600' },
  nuts:  { icon: '🥜', label: 'Contains Nuts', classes: 'bg-orange-100 text-orange-700' },
}
</script>
