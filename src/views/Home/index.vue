<template>
    <ul class="home">
        <li
            v-for="{id,url,cn,icon,en} in menus"
            @click="$router.push(url)"
            class="home-item"
            :key="id"
        >
            <i :class="'icon ' + icon"></i>
            <span class="text">{{cn}}</span>
            <span class="en">{{en}}</span>
        </li>
    </ul>
</template>
<script>
    import { menus } from "./static";
    export default {
        name: "Home",
        data() {
            return {
                menus: menus
            };
        }
    };
</script>
<style lang='scss' scoped>
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        .home-item {
            width: 120px;
            height: 120px;
            margin-left: 40px;
            border-radius: 8px;
            border: 4px solid $border_color_dark;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #4b4d4b;
            transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
            .icon {
                font-size: 36px;
            }
            .text {
                font-size: 14px;
                font-weight: bolder;
                margin-top: 14px;
            }
            .en {
                font-size: 12px;
                margin-top: 0px;
                font-weight: bold;
            }
            &:first-child {
                margin-left: 0;
            }
            &:hover {
                color: #39a476;
                border-color: #39a476;
            }
        }
    }
</style>