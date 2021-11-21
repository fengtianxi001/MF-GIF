<template>
    <custom-empty v-if="videos.length==0"></custom-empty>
    <draggable
        v-else
        class="the-videos-checkbox"
        v-model="videos"
    >
        <custom-video-card
            v-for="(video, index) in videos"
            :key="video.id"
            :data="video"
            :index="index + 1"
            @change="change"
            :checkbox="true"
            :sequence="true"
            ref="videoCard"
        />
    </draggable>
</template>
<script>
    export default {
        name: "TheVideoCheckbox",
        props: {},
        computed: {
            videos: {
                get() {
                    return this.$store.getters.videos;
                },
                set(val) {
                    this.$store.commit("setVideos", val);
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
                this.$refs.videoCard.map(cur => (cur.selected = true));
                this.checked = [...this.videos];
            },
            deCheckAll() {
                //取消项目全选
                this.$refs.videoCard.map(cur => (cur.selected = false));
                this.checked = [];
            },
            deleteChecked() {
                //删除选中项
                this.$confirmBox("是否继续移除选中项?", () => {
                    let videos = this.videos;
                    videos = [...videos];
                    this.checked.map(selected => {
                        const index = videos.findIndex(
                            videos => videos.id === selected.id
                        );
                        if (index >= 0) {
                            videos.splice(index, 1);
                        }
                    });
                    this.videos = videos;
                    this.checked = [];
                    this.$notify("删除成功!");
                });
            }
        }
    };
</script>
<style lang='scss' scoped>
    .the-videos-checkbox {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-column-gap: 15px;
        grid-row-gap: 15px;
        max-height: calc(100% - 50px);
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 0 20px 60px;
    }
</style>