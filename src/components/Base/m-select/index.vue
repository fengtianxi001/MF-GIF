<template>
    <div class="m-select">
        <div
            class="m-select-input"
            @click="visible = !visible"
        >
            <span>黄金糕</span>
            <a-icon
                type="caret-down"
                :style="iconStyle"
            />
        </div>
        <ul
            class="m-select-dropdown"
            v-show="visible"
        >
            <li
                v-for="{label,value} in options"
                :key="value"
                @click="optionHandle({label,value})"
            >{{label}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MSelect",
        props: {},
        data() {
            return {
                visible: false,
                options: [
                    {
                        value: "选项1",
                        label: "黄金糕"
                    },
                    {
                        value: "选项2",
                        label: "双皮奶"
                    },
                    {
                        value: "选项3",
                        label: "蚵仔煎"
                    },
                    {
                        value: "选项4",
                        label: "龙须面"
                    },
                    {
                        value: "选项5",
                        label: "北京烤鸭"
                    }
                ]
            };
        },
        computed: {
            iconStyle() {
                const deg = this.visible ? 180 : 0;
                return {
                    transform: `rotate(${deg}deg)`,
                    transition: "all .3s ease"
                };
            }
        },
        watch: {},
        methods: {
            optionHandle(){
                this.visible = false
            }
        }
    };
</script>
<style lang='scss' scoped>
    .m-select {
        width: 138px;
        height: $element_height;
        background-color: #353739;
        border-radius: 4px;
        position: relative;
        user-select: none;
    }
    .m-select-input {
        font-weight: bold;
        height: 100%;
        font-size: 13px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        justify-content: space-between;
        cursor: pointer;
        /* background-color: red; */
    }
    .m-select-dropdown {
        position: absolute;
        top: calc(#{$element_height} + 4px);
        background-color: #353739;
        width: 138px;
        text-align: left;
        border: 1px solid $border_color_dark;
        border-radius: 4px;
        li {
            line-height: 28px;
            font-size: 13px;
            cursor: pointer;
            font-weight: bold;
            padding: 0 10px;
            box-sizing: border-box;
            &:hover {
                background-color: #1f1f1f;
                color: #38a576;
            }
        }
    }
</style>