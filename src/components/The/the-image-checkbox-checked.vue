<template>
    <div
        class="the-image-checkbox-checked"
        v-show="checked.length!=0"
        ref="imageCheckboxChecked"
    >
        <h4>已选中{{checked.length}}个项目</h4>
        <div
            class="image-checkbox-list"
            ref="imageCheckboxCheckedList"
        >
            <custom-image-card
                class="image-checkbox-item"
                v-for="image in checked"
                :key="image.id"
                :data="image"
                size="40px"
            ></custom-image-card>
        </div>
    </div>
</template>
<script>
    export default {
        name: "the-image-checkbox-checked",
        props: {
            checked: Array
        },
        mounted() {
            document.addEventListener("mousewheel", this.mousewheel, false);
        },
        beforeDestroyed() {
            document.removeEventListener("mousewheel", this.mousewheel);
        },
        methods: {
            mousewheel(e) {
                const imageCheckboxChecked = this.$refs.imageCheckboxChecked;
                const imageCheckboxCheckedList = this.$refs
                    .imageCheckboxCheckedList;
                if (
                    imageCheckboxChecked &&
                    imageCheckboxChecked.contains(e.target)
                ) {
                    let v = e.wheelDelta ? e.wheelDelta : e.detail;
                    if (v > 3 || -v > 3) v = -v;
                    v > 0
                        ? (imageCheckboxCheckedList.scrollLeft += 50)
                        : (imageCheckboxCheckedList.scrollLeft -= 50);
                }
            }
        }
    };
</script>
<style lang='scss'>
    .the-image-checkbox-checked {
        padding: 4px 20px!important;
        box-sizing: border-box;
        h4 {
            color: #fff;
            font-size: 12px;
            margin-bottom: 4px;
        }
        .image-checkbox-list {
            display: flex;
            overflow-x: auto;
            &::-webkit-scrollbar {
                width: 2px;
                height: 0px;
            }
        }
        .image-checkbox-item {
            margin-right: 10px;
            flex-shrink: 0;
            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>