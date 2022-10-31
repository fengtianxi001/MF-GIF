import { createRouter, createWebHashHistory } from "vue-router"
import { constant } from "./constant"
import layout from "@/layout/index.vue"
import type { RouteRecordRaw } from "vue-router"

export type routesType = RouteRecordRaw & {
  meta?: {
    icon: any
    title: string
    hidden: boolean
    permission: Array<string>
    hideChildrenInMenu: boolean
    hiddenHeaderContent: boolean
  }
  children?: routesType[]
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/images",
      component: layout,
      children: [...constant],
    },
  ],
})

export default router
