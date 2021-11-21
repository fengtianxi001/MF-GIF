<template>
    <div
        class="custom-image-card"
        :style="style"
        @click="handle"
    >
        <img :src="data.url">
        <div
            class="custom-image-card-index"
            v-show="sequence"
        >{{index}}</div>
        <span
            class="custom-image-card-checkbox"
            v-show="selected && checkbox"
        >
            <i class="el-icon-check"></i>
        </span>
    </div>
</template>
<script>
    /*eslint-disable*/
    export default {
        name: "CustomImageCard",
        components: {
            mTag: () => import("@/components/Base/m-tag")
        },
        props: {
            data: Object,
            index: Number,
            checkbox: {
                type: Boolean,
                default: false
            },
            sequence: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: "60px"
            }
        },
        data() {
            return {
                selected: false
            };
        },
        computed: {
            style() {
                const style = {};
                style.width = this.size;
                style.height = this.size;

                if (this.selected) {
                    style.borderColor = "#39a476";
                }
                return style;
            }
        },

        methods: {
            handle() {
                const { data } = this;
                this.selected = !this.selected;
                const tag = this.selected ? "add" : "remove";
                this.$emit("change", { data, tag });
            }
        }
    };
</script>
<style lang='scss' scoped>
    .custom-image-card {
        width: 60px;
        height: 60px;
        border: 4px solid $border_color_dark;
        border-radius: 4px;
        padding: 0px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        img {
            width: 100%;
            height: 100%;
        }
        .custom-image-card-index {
            position: absolute;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            background-color: rgba($color: #1f1f1f, $alpha: 0.8);
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            z-index: 9;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .custom-image-card-checkbox {
            position: absolute;
            bottom: 0;
            right: 0px;
            width: 20px;
            height: 20px;
            background-color: #39a476;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding-top: 4px;
            border-radius: 50%;
            border: 2px solid #fff;
            z-index: 99;
            /* border-radius: 4px 4px 0 4px; */
        }
    }
</style>