const posts = [
  {
    title: 'New Summer Menu: Ethiopian Fusion',
    slug: 'new-summer-menu',
    category: 'Menu Update',
    author: 'Chef Abebe',
    published: true,
    published_at: '2025-06-15',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    excerpt: "We're excited to launch our summer menu — traditional favorites reimagined with seasonal local ingredients and bold new flavors.",
  },
  {
    title: "The Art of Kitfo: Chef Abebe's Story",
    slug: 'art-of-kitfo',
    category: "Chef's Corner",
    author: 'Chef Abebe',
    published: true,
    published_at: '2025-06-01',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    excerpt: 'Our head chef shares the story behind perfecting kitfo — sourcing premium beef, the right mitmita blend, and why leb-leb matters.',
  },
  {
    title: 'Ethiopian Wine Tasting Night',
    slug: 'wine-tasting-night',
    category: 'Events',
    author: 'TesfaBunna Team',
    published: true,
    published_at: '2025-05-20',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    excerpt: "We explored Awash Winery's full range alongside traditional Ethiopian dishes. Here's what paired best.",
  },
  {
    title: 'Celebrate Enkutatash With Us',
    slug: 'enkutatash-celebration',
    category: 'Events',
    author: 'TesfaBunna Team',
    published: true,
    published_at: '2025-05-05',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&q=80',
    excerpt: 'Ethiopian New Year is our favorite celebration. Join us for traditional dishes, teff honey cake, live music and a night to remember.',
  },
]

export async function seed(knex) {
  await knex('blog_posts').del()
  await knex('blog_posts').insert(posts)
  console.log(`  blog_posts: ${posts.length}`)
}