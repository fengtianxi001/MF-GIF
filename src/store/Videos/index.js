export default {
    state: {
        videos: []
    },
    mutations: {
        addVideos(state, list) {
            state.videos = state.videos.concat(list)
        },
        setVideos(state, list) {
            state.videos = list
        }
    },
    actions: {
        
    },
    getters: {
        videos: state => state.videos
    }
}