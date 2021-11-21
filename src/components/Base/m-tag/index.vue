<template>
    <span class="m-tag">
        <slot></slot>
    </span>
</template>
<script>
    export default {
        name: "MTag",
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
    .m-tag {
        border: 1px solid #38a576;
        color: #38a576;
        font-size: 12px;
        padding: 1px 6px;
        /* border-radius: 2px; */
    }
</style>