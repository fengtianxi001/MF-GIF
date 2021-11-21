import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import "@/assets/fonts/font.scss"
import 'element-ui/lib/theme-chalk/index.css';
const electron = require('electron');
console.log("electron", electron);
Vue.use(ElementUI);
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import draggable from 'vuedraggable'
Vue.component('draggable', draggable)
// Vue.use(Antd);
Vue.config.productionTip = false
import Base from "@/components/Base"
import Custom from "@/components/Custom"
import The from "@/components/The"
import Gallery from "@/components/Gallery"

Vue.use(Base)
Vue.use(Custom)
Vue.use(The)
Vue.use(Gallery)




Vue.prototype.$confirmBox = (title, callback) => {
	Vue.prototype.$confirm(title, "", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
		// iconClass: "confirmIcon"
	})
		.then(callback)
		.catch(() => { });
}

Vue.prototype.$notify = (message) => {
	Vue.prototype.$message({
		type: "info",
		message,
		offset: 60,
		duration: 1000
	});
}


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
