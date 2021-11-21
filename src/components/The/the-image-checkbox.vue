<template>
    <custom-empty v-if="images.length==0"></custom-empty>
    <draggable
        v-else
        class="the-image-checkbox"
        v-model="images"
    >
        <custom-image-card
            v-for="(image,index) in images"
            :key="image.id"
            :data="image"
            :index="index + 1"
            @change="change"
            :checkbox="true"
            :sequence="true"
            ref="imageCard"
        ></custom-image-card>
    </draggable>
</template>
<script>
    export default {
        name: "TheImageCheckbox",
        props: {},
        computed: {
            images: {
                get() {
                    return this.$store.getters.images;
                },
                set(val) {
                    this.$store.commit("setImages", val);
                }
            },
            checked: {
                get() {
                    return this.$attrs.checked;
                },
                set(checked) {
                    this.$emit("update:checked", checked);
                }
            }
        },
        watch: {},
        methods: {
            change(option) {
                const { tag, data } = option;
                if (tag === "add") {
                    return this.checked.push(data);
                }
                const index = this.checked.findIndex(cur => cur.id === data.id);
                this.checked.splice(index, 1);
            },
            checkAll() {
                this.$refs.imageCard.map(cur => (cur.selected = true));
                this.checked = [...this.images];
            },
            deCheckAll() {
                //取消项目全选
                this.$refs.imageCard.map(cur => (cur.selected = false));
                this.checked = [];
            },
            deleteChecked() {
                //删除选中项
                this.$confirmBox("是否继续移除选中项?", () => {
                    let images = this.images;
                    images = [...images];
                    this.checked.map(selected => {
                        const index = images.findIndex(
                            image => image.id === selected.id
                        );
                        if (index >= 0) {
                            images.splice(index, 1);
                        }
                    });
                    this.images = images;
                    this.checked = [];
                    this.$notify("删除成功!");
                });
            }
        }
    };
</script>
<style lang='scss' scoped>
    .the-image-checkbox {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-column-gap: 14px;
        grid-row-gap: 14px;
        max-height: calc(100% - 50px);
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 0 20px 60px;
    }
</style>