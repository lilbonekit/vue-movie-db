import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage/HomePage.vue'
import { vueRoutes } from '@/router/routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: vueRoutes.home.name,
      component: HomePage,
    },
    {
      path: '/my-films',
      name: vueRoutes.myFilms.name,
      component: () => import('@/pages/MyFilmsPage/MyFilmsPage.vue'),
      redirect: vueRoutes.queue,
      children: [
        {
          path: 'queue',
          name: vueRoutes.queue.name,
          component: () => import('@/pages/MyFilmsPage/components/MyFilmsPageQueue.vue'),
        },
        {
          path: 'watched',
          name: vueRoutes.watched.name,
          component: () => import('@/pages/MyFilmsPage/components/MyFilmsPageWatched.vue'),
        }
      ]
    }
  ]
})

export default router
