import { createApp } from 'vue'
import App from './App.vue'
import autofit from 'autofit.js'
import { router } from '@/router'
// import arco from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.less'
import '@/assets/styles/reset.scss'

const boostrap = async () => {
  const app = createApp(App)
  app.use(router)
  // app.use(arco)

  app.mount('#app')

  // const ScreenSize = {
  //   big: [2560, 1440],
  //   normal: [1920, 1080],
  //   small: [1280, 720],
  // }['normal']

  // autofit.init({
  //   el: '#app',
  //   dw: ScreenSize[0],
  //   dh: ScreenSize[1],
  //   resize: true,
  // })
}

boostrap()
