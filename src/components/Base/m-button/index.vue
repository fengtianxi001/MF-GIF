<template>
    <span
        class="m-button"
        :class="type"
        @click="$emit('click')"
    >
        <slot></slot>
    </span>
</template>
<script>
    export default {
        name: "MButton",
        components: {},
        mixins: [],
        props: {
            type: {
                type: String,
                default: "default"
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
    .m-button {
        height: $element_height;
        padding: 0 16px;
        line-height: $element_height;
        border-radius: 4px;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        user-select: none;
        color: #fff;
        &.default {
            background-color: #353739;
            &:hover {
                background-color: #464749;
                color: #fff;
            }
            &:active {
                background-color: #464749;
            }
        }
        &.danger {
            background-color: #e9686b;
            &:hover {
                background-color: #e98385;
                color: #fff;
            }

            &:active {
                background-color: #e98385;
            }
        }
        &.primary {
            background-color: #39a476;
            &:hover {
                background-color: #4da57f;
                color: #fff;
            }
            &:active {
                background-color: #237952;
            }
        }

    }
</style>