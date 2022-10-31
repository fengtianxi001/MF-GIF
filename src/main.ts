import { createApp } from "vue"
import App from "./App.vue"
import store from "@/store"
import router from "./router"
import ArcoVue from "@arco-design/web-vue"
import ArcoVueIcon from "@arco-design/web-vue/es/icon"
import "@arco-design/web-vue/dist/arco.css"
import "@/assets/styles/base.scss"

const app = createApp(App)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.use(store)
app.mount("#app")
