export default {
    state: {
        task: {}
    },
    mutations: {
        setTask(state, list) {
            state.task = list
        },
    },
    getters: {
        task: state => state.task,
    }
}