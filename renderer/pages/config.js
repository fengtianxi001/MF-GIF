const home = {
	data() {
		return {
			form: {
				gifWidth: 200,
				gifHeight: 200,
				interval: 0.5,
				images: [],
			},
			previewImage: null,
			isCreating: false,
			backups: {}
		}
	},
	methods: {
		prev() {
			if (this.isCreating || !this.diff()) {
				//已经有预览进程或者参数没有改变
				return false
			}
			this.isCreating = true
			this.previewImage = "../assets/loading.gif"
			let { images, gifWidth, gifHeight, interval } = this.form
			images = images.reduce((prev, cur) => {
				return prev.push(cur.path) && prev
			}, [])
			gifshot.createGIF({ images, gifWidth, gifHeight, interval }, res => {
				this.isCreating = false
				this.previewImage = res.image
			})
		},
		diff() {
			const { gifWidth, gifHeight, interval } = this.form
			const obj = {
				gifWidth,
				gifHeight,
				interval,
			}
			console.log(JSON.stringify(obj) === JSON.stringify(this.backups))
			if (JSON.stringify(obj) === JSON.stringify(this.backups)) {
				//参数没变
				return false
			} else {
				this.backups = obj
				return true
			}
		},
		save() {
			const base64 = this.previewImage
			if (!this.canSave) {
				return false
			}
			var blob = new Blob([''], {
				type: 'application/octet-stream',
			})
			var url = URL.createObjectURL(blob)
			var a = document.createElement('a')
			a.href = base64
			a.download = `img2Gif${new Date().getTime()}`
			var e = document.createEvent('MouseEvents')
			e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
			a.dispatchEvent(e)
			URL.revokeObjectURL(url)
		},
	},
	mounted() {
		if (!window.filesList || window.filesList.length === 0) {
			this.$router.push('/')
		} else {
			this.form.images = window.filesList
		}
	},
	computed: {
		canSave() {
			return !this.isCreating && this.previewImage
		}
	},
	template: `
		<template id="config">
			<div class="config-page">
				<div class="config-conatiner">
					<ul class="config-form">
						<li class="config-form-item">
							<label for="width">宽度:</label>
							<div class="config-form-item-tips">设置动图的宽度</div>
							<div class="config-form-item-shell">
								<input id="width" v-model="form.gifWidth" />
								<span class="unit">像素</span>
							</div>
						</li>
						<li class="config-form-item">
							<label for="width">高度:</label>
							<div class="config-form-item-tips">设置动图的高度</div>
							<div class="config-form-item-shell">
								<input id="width" v-model="form.gifHeight" />
								<span class="unit">像素</span>
							</div>
						</li>
						<li class="config-form-item">
							<label for="width">间隔:</label>
							<div class="config-form-item-tips">设置图片切换的间隔</div>
							<div class="config-form-item-shell">
								<input id="width" v-model="form.interval" />
								<span class="unit">秒</span>
							</div>
						</li>
						<li class="config-form-item">
							<label for="width">操作:</label>
							<div class="config-form-item-tips">预览后才可以保存</div>
							<div class="config-form-item-operate">
								<button @click="prev" class="canSave">预览</button>
								<button @click="save" style="margin-left: 4px" :class="{canSave:canSave}">保存</button>
							</div>
						</li>
					</ul>
					<div class="preview config-form-item">
						<label for="width">效果预览:</label>
						<div class="config-form-item-tips">预览的图片的大小，并非最终的图片尺寸</div>
						<div class="config-form-item-shell" v-if="previewImage">
							<img :src="previewImage" alt="preview" />
						</div>
					</div>
				</div>
			</div>
		</template>
	`
}
module.exports = home
