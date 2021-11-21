export default {
    state: {
        images: []
    },
    mutations: {
        addImages(state, list) {
            state.images = state.images.concat(list)
        },
        setImages(state, list) {
            state.images = list
        }
    },
    actions: {
        
    },
    getters: {
        images: state => state.images
    }
}