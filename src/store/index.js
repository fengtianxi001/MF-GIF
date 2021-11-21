
import Vue from 'vue'
import Vuex from 'vuex'
import images from "./Images/index"
import videos from "./Videos/index"

import tasks from "./Tasks/index"

Vue.use(Vuex)


export default new Vuex.Store({
  modules: { images, tasks, videos }
})
