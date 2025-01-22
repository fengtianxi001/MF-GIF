import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import '@arco-design/web-vue/dist/arco.less'
import 'animate.css'
import '@/assets/styles/reset.scss'

const boostrap = async () => {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}

boostrap()
