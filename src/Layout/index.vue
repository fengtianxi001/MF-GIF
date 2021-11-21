<template>
    <div class="layout">
        <div class="layout-main">
            <the-header></the-header>
            <div class="layout-content">
                <transition name="slide-fade">
                    <router-view class="router-view"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Layout",
        components: {
            theHeader: () => import("./components/TheHeader.vue")
        },
        data() {
            return {
                transitionName: "slide-down"
            };
        },
        computed: {},
        watch: {
            $route(to, from) {
                //如果to索引大于from索引,判断为前进状态,反之则为后退状态

                // console.log(to.meta.index > from.meta.index);
                if (to.meta.index > from.meta.index) {
                    //设置动画名称
                    this.transitionName = "slide-down";
                } else {
                    this.transitionName = "slide-up";
                }
            }
        },
        methods: {
            changeTheme() {
                window.document.documentElement.setAttribute(
                    "data-theme",
                    "theme_light"
                );
            }
        }
    };
</script>
<style lang="scss" scoped>
    .layout {
        width: 800px;
        height: 515.9px;
        /* background-image: url("../assets/imgs/wallpaper.jpg"); */
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #75777c;
        box-shadow: 0px 0px 15px 0px #000000d6;
        border-radius: 6px;
        overflow: hidden;
        .layout-main {
            width: 100%;
            height: 100%;
            @include bg_color($bgc_dark);
            backdrop-filter: blur(80px);
            box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
            border-radius: 6px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            /* background-color: #1f1f1f; */
            background-color: rgba(31, 31, 31, 0.5);
            position: relative;
            .layout-content {
                display: flex;
                height: calc(100% - #{$bar_height});
                flex-shrink: 1;
                overflow-y: auto;
                background-color: rgba(31, 31, 31, 0.9);
                position: relative;
            }
            .router-view {
                flex: 1;
                width: 100%;
                position: absolute;
                /* height: calc(100% - #{$bar_height}); */
                /* overflow-y: auto; */
            }
        }
    }

    .slide-fade-enter-active {
        transition: all 0.5s ease;
    }
    .slide-fade-leave-active {
        transition: all 0.5s ease;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: scale(0.1);
        opacity: 0;
    }
</style>
