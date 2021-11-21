<template>
    <div class="custom-empty">
        <img src="@/assets/imgs/empty.png" alt="empty">
    </div>
</template>
<script>
    export default {
        name: "custom-empty",
        components: {},
        mixins: [],
        props: {
            visible: {
                type: Boolean,
                default: false
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
    .custom-empty {
        width: 100%;
        height: 435px;
        /* background-color: red; */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: move;
        img{
            width: 300px;
            -webkit-user-drag: none;
        }
    }
</style>