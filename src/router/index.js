import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const isAuthenticated = () => {
  return store.state.isAuthenticated
}

//~ route auth guard
const requireAuth = (to, from, next) => {
  if (!isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import('@/components/MainLayout.vue'),
      children: [
        {
          path: '',
          component: import('@/views/HomeView.vue'),
          beforeEnter: requireAuth,
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          beforeEnter: requireAuth,
        },
        {
          path: '/tasks',
          name: 'tarefas',
          component: () => import('@/views/TasksView.vue'),
          beforeEnter: requireAuth,
        },
        {
          path: '/settings',
          name: 'configuracoes',
          component: () => import('@/views/SettingsView.vue'),
          beforeEnter: requireAuth,
        },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

export const isRouteActive = (route) => {
  const currentRoute = router.currentRoute.value
  return currentRoute.path.startsWith(route)
}

export default router
