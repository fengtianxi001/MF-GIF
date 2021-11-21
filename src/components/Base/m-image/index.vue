<template>
    <div
        class="m-image"
        v-loading="!complate"
        :element-loading-text="loadText"
        element-loading-background="rgba(33, 33, 33, 0.8)"
        customClass="m-image-loading"
        :element-loading-spinner="spinner"
    >
        <img
            v-show="complate"
            :src="src"
            alt="gif预览图"
        >

    </div>
</template>
<script>
    export default {
        name: "MImage",
        components: {},
        mixins: [],
        props: {
            src: String,
            loadText: String,
            complate: Boolean,
            spinner: {
                type: String,
                default: ""
            }
        },

        data() {
            return {};
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
    .m-image {
        width: 200px;
        height: 200px;
        border: 10px solid #39a476;
        border-radius: 10px;
        margin-right: 100px;
        box-sizing: border-box;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
        }

    }
</style>