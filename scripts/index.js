const { processData } = require("../mock/config")
const home = require("../renderer/pages/home")
const config = require("../renderer/pages/config")

const { remote } = require('electron')
const routes = [
	{ name: "home", path: '/', component: home },
	{ name: "config", path: '/config', component: config },
	{ name: "complete", path: '/complete', template: '<div>foo</div>' },
	{ name: "save", path: '/save', template: '<div>foo</div>' }
]
const router = new VueRouter({
	routes
})

const vm = new Vue({
	el: "#app",
	router,
	data: {
		process: 1,
		processData,
		filesList: []
	},
	watch: {
		$route: {
			immediate: true,
			deep: true,
			handler(val) {
				const _enum = {
					home: 1,
					config: 2,
					complete: 3,
					save: 4
				}
				this.process = _enum[val.name]
			}
		}


	},
	methods: {
		close() {
			const currentWindow = remote.getCurrentWindow();
			currentWindow.close();
		},
		minisize() {
			const currentWindow = remote.getCurrentWindow();
			currentWindow.minimize();
		}
	}
})