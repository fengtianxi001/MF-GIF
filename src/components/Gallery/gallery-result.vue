<template>
    <div class="gallery-result">
        <div class="gallery-result-image">
            <slot name="image"></slot>
        </div>
        <div class="gallery-result-operate">
            <slot name="operate"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "gallery-result",
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
<style lang='scss'>
    .gallery-result {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .gallery-result-image,
        .gallery-result-operate {
            width: 240px;
            height: 240px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .gallery-result-image {
            img {
                width: 180px;
                height: 180px;
                /* border: 10px solid #39a476; */
                /* border-radius: 10px; */
                margin-right: 100px;
            }
        }
        .gallery-result-operate {
            .m-button {
                width: 170px;
                margin-top: 10px;
                height: 42px;
                text-align: center;
                line-height: 42px;
                font-size: 13px;
            }
        }
    }
</style>