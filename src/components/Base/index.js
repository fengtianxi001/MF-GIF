const contexts = require.context("./", true, /index.vue/);

const Base = contexts.keys().map(key => {
    const component = contexts(key).default
    return {
        name: component["name"],
        component
    }
}, {});

console.log("Base", Base);
export default {
    install: Vue => {
        Base.map(({ name, component }) => {
            Vue.component(name, component)
        })
    }
}