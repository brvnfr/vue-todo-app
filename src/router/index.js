import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/tasks',
      name: 'tarefas',
      component: () => import('../views/TasksView.vue'),
    },
    {
      path: '/settings',
      name: 'configuracoes',
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

export default router
