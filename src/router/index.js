/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/Layout/index.vue"
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
		path: "/",
		component: layout,
		redirect: "/home",
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@/views/Home/index.vue"),
				meta: {
					id: "home",
					text: "首页",
					index: 0
				}
			},
			{
				path: "image",
				name: "image",
				component: () => import("@/views/Image/index.vue"),
				meta: {
					id: "image",
					text: "图标转GIF",
					index: 1
				}
			},
			{
				path: "video",
				name: "video",
				component: () => import("@/views/Video/index.vue"),
				meta: {
					id: "video",
					text: "视频转GIF",
					index: 2
				}
			},
			{
				path: "camera",
				name: "camera",
				component: () => import("@/views/Camera/index.vue"),
				meta: {
					id: "camera",
					text: "摄像头转GIF",
					index: 3
				}
			},
			{
				path: "/task",
				name: "task",
				component: () => import("@/views/Task/index.vue"),
				meta: {
					id: "task",
					text: "转换任务",
					index: 9999
				}
			},
		]
	},
]
const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router
