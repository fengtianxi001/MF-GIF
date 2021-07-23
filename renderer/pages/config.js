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
            isCreating:false,
            backups:{}
		}
	},
	methods: {
		prev() {
            if (this.isCreating || !this.diff()){
                //已经有预览进程或者参数没有改变
                return false
            }
            this.isCreating = true
            this.previewImage ="../assets/loading.gif"
			let { images, gifWidth, gifHeight, interval } = this.form
			images = images.reduce((prev, cur) => {
				return prev.push(cur.path) && prev
			}, [])
			gifshot.createGIF({ images, gifWidth, gifHeight, interval }, res => {
                this.isCreating = false
				this.previewImage = res.image
			})
		},
        diff(){
            const { gifWidth, gifHeight, interval} = this.form
            const obj = {
                gifWidth,
                gifHeight,
                interval,
            }
            console.log(JSON.stringify(obj) === JSON.stringify(this.backups) )
            if (JSON.stringify(obj) === JSON.stringify(this.backups) ){
                //参数没变
                return false
            }else{
                this.backups = obj
                return true
            }
        },
		save() {
            const base64 = this.previewImage
            if (!this.canSave){
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
    computed:{
        canSave(){
            return !this.isCreating && this.previewImage
        }
    },
	template: document.getElementById('config'),
}
module.exports = home
