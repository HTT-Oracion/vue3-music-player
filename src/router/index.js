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
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: () => import('@/views/SearchPage'),
    // children: [
    //   {
    //     path: 'SongsList',
    //     name: 'SongsList',
    //     component: () => import('@/views/SearchPage/SongsonSearch')
    //   }
    // ]
  },
  {
    path: '/ListDetail',
    name: 'ListDetail',
    component: () => import('@/components/PlayerContent/ListDetail')
  },
  {
    path: '/ArtistDetail',
    name: 'ArtistDetail',
    component: () => import('@/components/Artists/ArtistDetail')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
