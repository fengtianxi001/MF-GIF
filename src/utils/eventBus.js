class EventBus {
    constructor() {
        this.eventMap = new Map()
    }
    on(name, callback) {
        const exit = this.eventMap.has(name)
        if (exit) {
            const arr = this.eventMap.get(name)
            arr.push(callback)
        } else {
            const arr = [callback]
            this.eventMap.set(name, arr)
        }
    }
    emit(name) {
        const exit = this.eventMap.has(name)
        console.log(exit);
        if (exit) {
            const arr = this.eventMap.get(name)
            arr.map(cur => cur())
        }
    }
}
export default new EventBus()