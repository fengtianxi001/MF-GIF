<template>
    <input
        type="text"
        class="m-input"
        v-model="value"
        placeholder="请输入内容"
    >
</template>
<script>
    export default {
        name: "MInput",
        components: {},
        mixins: [],
        props: {},
        data() {
            return {
                value: ""
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        destroyed() {},
        methods: {}
    };
</script>
<style lang='scss' scoped>
    .m-input {
        width: 137px;
        height: $element_height;
        border: none;
        outline: none;
        border-radius: 4px;
        background-color: #353739;
        color: #75777c;
        font-weight: bold;
        box-sizing: border-box;
        padding: 10px;
        font-size: 13px;
    }
</style>