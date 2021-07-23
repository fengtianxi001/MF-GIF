const { imgData } = require("../../mock/config")
const home = {
    data: function () {
        return {
            active: null,
            files: [],
        }
    },
    methods: {
        pick() {
            const input = document.createElement("input")
            input.type = "file"
            input.multiple = "multiple"
            input.accept="image/*"
            input.onchange = this.valueChange
            input.click()
        },
        del() {
            const { active, files } = this
            const index = files.findIndex(v => v.id === active)
            const cache = [...files]
            cache.splice(index, 1)
            //为了触发watch
            this.files = cache
        },
        async valueChange(e) {
            const files = e.path[0].files
            const arr= []
            for (let i = 0; i < files.length;i++){
                const file = files[i]
                const obj = {}
                obj.name = file.name
                obj.size = file.size
                obj.path = await this.toBase64(file)
                obj.id = Math.random()*100000
                arr.push(obj)
            }
            if (arr) {
                // console.log(arr)
                this.files = [...this.files, ...arr]
            }
        },
        toBase64(params) {
            return new Promise((resolve,reject)=>{
                var reader = new FileReader()
                reader.onload = e => {
                    resolve(e.target.result)
                }
                reader.readAsDataURL(params)
            })
            
        },
        panelHandle(id) {
            this.active = id
        },
        direction(param) {
            const { active, files } = this
            const orignIndex = files.findIndex(v => v.id === active)
            const orign = files[orignIndex]
            const targetIndex = orignIndex + param
            const target = files[targetIndex]
            if (target && orign) {
                this.$set(files, targetIndex, orign)
                this.$set(files, orignIndex, target)
            }
        },
        next() {
            this.$router.push("/config")
        },
        blur(event) {
            event.stopPropagation()
            let flag = event.path.find(el => {
                const { className} = el
                return className && (className.indexOf("img-panel") >= 0 || className.indexOf("up") >= 0 || className.indexOf("down") >= 0 || className.indexOf("del") >= 0)
            })
            if (!flag) {
                this.active = null
            }
        }
    },
    filters: {
        dateFormat(value) {
            const date = new Date(value)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDay()
            return `${year}年${month}月${day}日`
        },
        sizeFormat(value) {
            if (!Number(value)) {
                return "未知大小"
            } else {
                const kb = (value / 1024).toFixed(2)
                const m = (value / 1024 / 1024).toFixed(2)
                const g = (value / 1024 / 1024 / 1024).toFixed(2)

                if (kb < 1024) {
                    return kb + "KB"
                } else if (m < 1024) {
                    return m + "M"
                } else {
                    return g + "G"
                }
            }
        }
    },
    mounted() {
        document.addEventListener("click", this.blur)
        this.files = window.filesList||[]
        
    },
    beforeDestroy() {
        document.removeEventListener("click", this.blur)
    },
    watch: {
        files: {
            deep:true,
            handler(files,old){
                window.filesList = files
                const length = files.length
                if (old.length !== length && length!==0)
                    this.active = files[length-1]["id"]
            }
        }
    },
    template: document.getElementById("home")
}
module.exports = home