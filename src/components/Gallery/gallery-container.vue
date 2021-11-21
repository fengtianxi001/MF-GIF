<template>
    <div class="gallery-container">
        <div class="gallery-container-operate">
            <slot name="operate"></slot>
        </div>
        <div class="gallery-container-content">
            <slot name="content"></slot>
        </div>
        <div class="gallery-container-fixed">
            <slot name="fixed"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "gallery-container",
        components: {},
        mixins: [],
        props: {},
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
    .gallery-container {
        width: 100%;
        height: 100%;
        .gallery-container-operate {
            box-sizing: border-box;
            padding: 10px 20px 10px;
            /* background-color: rgba(31, 31, 31, 0.5); */
            backdrop-filter: blur(4px);
            position: sticky;
            top: 0px;
            z-index: 999;
        }
        .gallery-container-content {
            width: 100%;
        }
        .gallery-container-fixed {
            position: fixed;
            bottom: 0px;
            left: 0px;
            overflow-x: auto;
            width: calc(100vw - 80px);
            background-color: rgba(3, 3, 3, 0.5);
            backdrop-filter: blur(4px);
            width: 100%;
            z-index: 9999;
            transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    }
</style>