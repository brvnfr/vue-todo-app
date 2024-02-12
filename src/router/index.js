import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const isAuthenticated = () => {
  return store.state.auth.isAuthenticated
}

const routes = [
  {
    path: '/',
    redirect: '/tasks',
    component: () => import('@/components/Layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard/DashboardView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/tasks',
        name: 'tasks',
        component: () => import('@/views/Tasks/TasksView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/Settings/SettingsView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

//~ guarda de autenticação
// router.beforeEach((to, from, next) => {
//   //~ Verifica se a rota requer autenticação
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     //~ Redireciona para a página de login se não estiver autenticado
//     if (!isAuthenticated()) {
//       next('/login')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export const isRouteActive = (route) => {
  const currentRoute = router.currentRoute.value
  return currentRoute.path.startsWith(route)
}

export default router
