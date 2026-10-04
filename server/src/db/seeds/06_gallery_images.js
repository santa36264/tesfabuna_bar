const gallery = [
  { category: 'interior', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Restaurant main dining area' },
  { category: 'interior', src: 'https://images.unsplash.com/photo-1552566626-52f8b828329e?w=600&q=80', alt: 'Cozy private dining section' },
  { category: 'outdoor', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', alt: 'Outdoor terrace seating' },
  { category: 'food', src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', alt: 'Traditional Ethiopian spread' },
  { category: 'food', src: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80', alt: 'Doro Wat plating' },
  { category: 'food', src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', alt: 'Beyaynetu fasting platter' },
  { category: 'drinks', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', alt: 'Signature cocktails' },
  { category: 'bar', src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80', alt: 'Our full bar' },
  { category: 'music', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', alt: 'Live music night' },
  { category: 'staff', src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80', alt: 'Our team' },
  { category: 'interior', src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80', alt: 'Bar seating area' },
  { category: 'outdoor', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Garden dining' },
]

export async function seed(knex) {
  await knex('gallery_images').del()

  await knex('gallery_images').insert(
    gallery.map((image, index) => ({ ...image, sort_order: index, active: true })),
  )

  console.log(`  gallery_images: ${gallery.length}`)
}