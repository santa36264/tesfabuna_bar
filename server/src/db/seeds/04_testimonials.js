const testimonials = [
  { name: 'Selam Tadesse', rating: 5, approved: true, avatar: 'https://i.pravatar.cc/80?img=1', review: "Absolutely amazing! The Kitfo was perfectly prepared and the Beyaynetu platter was the best I've had in Addis. Warm, authentic atmosphere." },
  { name: 'Michael Johnson', rating: 5, approved: true, avatar: 'https://i.pravatar.cc/80?img=3', review: "Best Ethiopian restaurant I've visited. The Doro Wat was outstanding — that egg soaked in berbere sauce is unreal!" },
  { name: 'Tigist Haile', rating: 5, approved: true, avatar: 'https://i.pravatar.cc/80?img=5', review: "TesfaBunna is our family's go-to spot. The coffee ceremony on weekends is a beautiful experience." },
  { name: 'Ahmed Hassan', rating: 4, approved: true, avatar: 'https://i.pravatar.cc/80?img=8', review: 'Great ambiance, very attentive staff. The Tibs was tender and the Tej Sunrise cocktail was delicious.' },
  { name: 'Sara Williams', rating: 5, approved: true, avatar: 'https://i.pravatar.cc/80?img=9', review: 'The injera is the best I\'ve had. The Shiro Wat and Misir together are a dream. Staff made us feel like family.' },
  { name: 'Yonas Bekele', rating: 5, approved: true, avatar: 'https://i.pravatar.cc/80?img=12', review: 'The Jebena coffee ceremony alone is worth the trip. Watching them roast the beans at the table is unforgettable.' },
]

export async function seed(knex) {
  await knex('testimonials').del()
  await knex('testimonials').insert(testimonials)
  console.log(`  testimonials: ${testimonials.length}`)
}