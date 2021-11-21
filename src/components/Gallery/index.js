const contexts = require.context("./", true, /.vue/);

const Gallery = contexts.keys().map(key => {
    const component = contexts(key).default
    return {
        name: component["name"],
        component
    }
}, {});
export default {
    install: Vue => {
        Gallery.map(({ name, component }) => {
            Vue.component(name, component)
        })
    }
}