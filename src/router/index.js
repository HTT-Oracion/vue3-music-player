import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/RecomPage'
  },
  {
    path: '/RecomPage',
    name: 'RecomPage',
    component: () => import('@/views/RecommendPage')
  },
  {
    path: '/RankPage',
    name: 'RankPage',
    component: () => import('@/views/RankPage')
  },
  {
    path: '/MusicList',
    name: 'MusicList',
    component: () => import('@/views/MusicList')
  },
  {
    path: '/NewestMusic',
    name: 'NewestMusic',
    component: () => import('@/views/NewestMusic')
  },
  {
    path: '/ArtistList',
    name: 'ArtistList',
    component: () => import('@/views/ArtistList')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
