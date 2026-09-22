import { createRouter, createWebHistory } from 'vue-router'
import { useAdminAuth } from './stores/auth'

const routes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('./views/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/admin',
    component: () => import('./components/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '',          name: 'AdminDashboard',    component: () => import('./views/DashboardView.vue') },
      { path: 'menu',      name: 'AdminMenu',         component: () => import('./views/MenuView.vue') },
      { path: 'drinks',    name: 'AdminDrinks',       component: () => import('./views/DrinksView.vue') },
      { path: 'gallery',   name: 'AdminGallery',      component: () => import('./views/GalleryView.vue') },
      { path: 'blog',      name: 'AdminBlog',         component: () => import('./views/BlogView.vue') },
      { path: 'reservations', name: 'AdminReservations', component: () => import('./views/ReservationsView.vue') },
      { path: 'testimonials', name: 'AdminTestimonials', component: () => import('./views/TestimonialsView.vue') },
      { path: 'messages',  name: 'AdminMessages',     component: () => import('./views/MessagesView.vue') },
      { path: 'profile',   name: 'AdminProfile',      component: () => import('./views/ProfileView.vue') },
    ],
  },
]

export const adminRouter = createRouter({
  history: createWebHistory(),
  routes,
})

adminRouter.beforeEach((to) => {
  const auth = useAdminAuth()
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    return { name: 'AdminLogin' }
  }
  if (to.path === '/admin/login' && auth.isLoggedIn()) {
    return { name: 'AdminDashboard' }
  }
})
