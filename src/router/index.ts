import { createRouter, createWebHashHistory } from 'vue-router'
import { Layout } from '@/layout'

export const routes: any[] = [
  {
    path: '/image',
    name: 'image',
    meta: { title: '图片转GIF' },
    component: () => import('@/pages/image/index.vue'),
  },
  {
    path: '/video',
    name: 'video',
    meta: { title: '视频转GIF' },
    component: () => import('@/pages/video/index.vue'),
  },
  {
    path: '/camera',
    name: 'camera',
    meta: { title: '录像转GIF' },
    component: () => import('@/pages/camera/index.vue'),
  },
  {
    path: '/screen',
    name: 'screen',
    meta: { title: '屏幕转GIF' },
    component: () => import('@/pages/screen/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/image',
      component: Layout,
      children: [...routes],
    },
  ],
})

export default router
