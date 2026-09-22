import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/AboutView.vue') },
  { path: '/menu', name: 'Menu', component: () => import('@/views/MenuView.vue') },
  { path: '/drinks', name: 'Drinks', component: () => import('@/views/DrinksView.vue') },
  { path: '/reservation', name: 'Reservation', component: () => import('@/views/ReservationView.vue') },
  { path: '/gallery', name: 'Gallery', component: () => import('@/views/GalleryView.vue') },
  { path: '/blog', name: 'Blog', component: () => import('@/views/BlogView.vue') },
  { path: '/blog/:id', name: 'BlogPost', component: () => import('@/views/BlogPostView.vue') },
  { path: '/testimonials', name: 'Testimonials', component: () => import('@/views/TestimonialsView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/ContactView.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('@/views/FAQView.vue') },
  { path: '/qr-menu', name: 'QRMenu', component: () => import('@/views/QRMenuView.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
