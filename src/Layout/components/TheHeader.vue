<template>
    <div class="the-header">
        <div class="the-header-logo">
            <custom-logo
                class="logo"
                width="30"
                height="30"
            ></custom-logo>
            <span
                style="margin-left:10px"
                :class="{twinkleColor}"
            >MF-GIF</span>
        </div>

        <ul class="the-header-operate">
            <li
                class="el-icon-minus"
                @click="minus"
            ></li>
            <li
                class="el-icon-close"
                @click="close"
            ></li>
        </ul>
    </div>
</template>
<script>
    /*eslint-disable*/
    import eventBus from "@/utils/eventBus.js";
    import { ipcRenderer } from 'electron'
    export default {
        name: "TheHeader",
        data() {
            return {
                twinkleColor: false
            };
        },
        mounted() {
            eventBus.on("translating", () => {
                this.twinkleColor = true;
            });
            eventBus.on("translated", () => {
                this.twinkleColor = false;
            });
        },
        methods: {
            minus() {
                ipcRenderer.send('min-app')
            },
            close() {
                // const currentWindow = remote.getCurrentWindow();
                // currentWindow.close();
               ipcRenderer.send('close-app')
            }
        }
    };
</script>
<style lang='scss' scoped>
    .the-header {
        height: $bar_height;
        @include border($border_color_dark);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        color: #75777c;
        display: flex;
        align-items: center;
        position: relative;
        /* background-color: #252628; */
        background-color: rgba(31, 31, 31, 0.9);
        -webkit-app-region: drag;
        user-select: none;
        .the-header-logo {
            font-size: 16px;
            font-weight: bolder;
            margin-left: 0px;
            width: 170px;
            height: 100%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding-left: 20px;
            .logo {
                width: calc(#{$bar_height} - 10px);
                height: calc(#{$bar_height} - 10px);
            }
        }
        .the-header-operate {
            position: absolute;
            right: 0;
            display: flex;
            -webkit-app-region: no-drag;
            height: 100%;
            li {
                width: 50px;
                display: flex;
                height: 100%;
                align-items: center;
                font-size: 16px;
                cursor: pointer;
                justify-content: center;
                cursor: pointer;
                &:hover {
                    background-color: #39a476;
                    color: #fff;
                }
            }
        }
    }
    .twinkleColor {
        animation: twinkleColor 1s ease infinite;
    }
    @keyframes twinkleColor {
        0% {
            color: #75777c;
        }
        100% {
            color: #38a576;
        }
    }
</style>