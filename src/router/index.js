// router.js
import { createRouter, createWebHistory } from 'vue-router'

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
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/tasks',
          name: 'tarefas',
          component: () => import('@/views/TasksView.vue'),
        },
        {
          path: '/settings',
          name: 'configuracoes',
          component: () => import('@/views/SettingsView.vue'),
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
