<template>
    <div>
        <gallery-container>
            <m-button-group
                slot="operate"
                :options="buttonOptions"
            />
            <the-image-checkbox
                slot="content"
                ref="theImageCheckbox"
                :checked.sync="checked"
            />
            <the-image-checkbox-checked
                slot="fixed"
                :checked="checked"
            />
        </gallery-container>
        <custom-config
            :visible.sync="configVisible"
            @submit="submit"
        />
    </div>
</template>
<script>
    /*eslint-disable*/
    export default {
        name: "ImagePage",
        data() {
            return {
                checked: [],
                isCheckAll: false,
                configVisible: false,
                images:[]
            };
        },
        computed: {
            buttonOptions() {
                const {
                    isCheckAll,
                    checkAll,
                    deCheckAll,
                    deleteChecked,
                    translateChecked,
                    translateAll,
                    checked
                } = this;
                return [
                    {
                        name: "返回首页",
                        type: "default",
                        condition: true,
                        event: () => {
                            this.$router.push("/home");
                        }
                    },
                    {
                        name: "全选",
                        type: "default",
                        condition: !isCheckAll,
                        event: checkAll
                    },
                    {
                        name: "取消选择",
                        type: "default",
                        condition: checked.length > 0,
                        event: deCheckAll
                    },
                    {
                        name: "删除选中项",
                        type: "default",
                        condition: checked.length > 0,
                        event: deleteChecked
                    },
                    {
                        name: "转化选中项",
                        type: "primary",
                        condition: checked.length > 0,
                        event: translateChecked
                    },
                    {
                        name: "全部转换",
                        type: "primary",
                        condition: true,
                        event: translateAll
                    }
                ];
            }
        },
        methods: {
            checkAll() {
                this.$refs.theImageCheckbox.checkAll();
            },
            deCheckAll() {
                this.$refs.theImageCheckbox.deCheckAll();
            },

            deleteChecked() {
                this.$refs.theImageCheckbox.deleteChecked();
            },
            translateAll() {
                const images = this.$store.getters.images;
                const length = images.length;
                if (length === 0) return this.$notify("请添加图片资源");
                this.configVisible = true;
                this.images = images
            },
            translateChecked() {
                //转换选中项
                const length = this.checked.length;
                if (length === 0) return this.$notify("至少勾选一项");
                this.configVisible = true;
                this.images = this.checked
            },
            submit(_option) {
                const images = this.images.map(cur => cur.url);
                const option = {
                    ..._option,
                    images
                };
                this.$store.commit("setTask", option);
                this.$router.push("/task");
            }
        }
    };
</script>
<style lang='scss' scoped>
</style>