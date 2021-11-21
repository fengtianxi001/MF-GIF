<template>
    <div class="the-menu">
        <div
            class="menu-row"
            v-for="menu in menus"
            :key="menu.id"
            @click="handle(menu)"
            :class="{active: active.id === menu.id}"
        >
            <a-icon
                :type="menu.icon"
                :theme="active.id === menu.id?'filled':'outlined'"
                class="icon"
            />
            <span>{{menu.text}}</span>
        </div>
        <div
            class="menu-bg-coat"
            :style="coatStyle"
        ></div>
    </div>
</template>
<script>
    export default {
        name: "TheMenu",
        data() {
            return {
                menus: [],
                active: null
            };
        },
        computed: {
            coatStyle() {
                const {
                    active: { index }
                } = this;
                const y = index * 34 + (index + 1) * 10 + "px";
                return {
                    transform: `translateY(${y})`
                };
            }
        },
        watch: {
            $route: {
                deep: true,
                immediate : true,
                handler(route){
                    this.active = route.meta
                }
            }
        },
        mounted() {
            const routers = this.$router.options.routes[0]["children"];
            this.menus = routers.map(cur => {
                return {
                    ...cur.meta,
                    name: cur.name
                };
            });
        },
        methods: {
            handle(menu) {
                this.active = menu;
                if (menu.name) {
                    this.$router.push({ name: menu.name });
                }
            }
        }
    };
</script>
<style lang='scss' scoped>
    .the-menu {
        width: 170px;
        height: 100%;
        @include border($border_color_dark);
        border-right-width: 1px;
        border-right-style: solid;
        background-color: #252628;
        box-sizing: border-box;
        padding: 10px 16px 0px;
        user-select: none;
        font-weight: bolder;
        font-size: 13px;
        position: relative;
        .menu-row {
            width: 100%;
            height: 34px;
            display: flex;
            align-items: center;
            margin-top: 10px;
            cursor: pointer;
            padding: 10px 0px 6px 10px;
            position: relative;
            z-index: 3;
            transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
            &.active {
                color: #38a576;
            }
            &:hover {
                color: #38a576;
                /* background-color: #1f1f1f87; */
            }
            .icon {
                font-size: 16px;
            }
            span {
                margin-left: 8px;
            }
        }

        .menu-bg-coat {
            background-color: #1f1f1f;
            height: 34px;
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 2;
            width: calc(100% - 20px);
            border-radius: 4px;
            transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    }
</style>