import type { routesType } from "./index"

import {
  IconImage,
  IconVideoCamera,
  IconCamera,
  IconLiveBroadcast,
} from "@arco-design/web-vue/es/icon"
export const constant: routesType[] = [
  {
    path: "/images",
    name: "images",
    meta: {
      title: "图片转GIF",
      icon: IconImage,
      hidden: false,
      hideChildrenInMenu: false,
      hiddenHeaderContent: false,
      permission: ["admin"],
    },
    component: () => import("@/views/Images/index.vue"),
  },
  {
    path: "/video",
    name: "video",
    meta: {
      title: "视频转GIF",
      icon: IconVideoCamera,
      hidden: false,
      hideChildrenInMenu: false,
      hiddenHeaderContent: false,
      permission: ["admin"],
    },
    component: () => import("@/views/Video/index.vue"),
  },
  {
    path: "/camera",
    name: "camera",
    meta: {
      title: "录像转GIF",
      icon: IconCamera,
      hidden: false,
      hideChildrenInMenu: false,
      hiddenHeaderContent: false,
      permission: ["admin"],
    },
    component: () => import("@/views/Camera/index.vue"),
  },
  {
    path: "/screen",
    name: "screen",
    meta: {
      title: "屏幕转GIF",
      icon: IconLiveBroadcast,
      hidden: false,
      hideChildrenInMenu: false,
      hiddenHeaderContent: false,
      permission: ["admin"],
    },
    component: () => import("@/views/Screen/index.vue"),
  },
]
