<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
    /*eslint-disable*/
    import { v4 as uuidv4 } from "uuid";
    const preventDefault = e => e.preventDefault();
    export default {
        data() {
            return {};
        },
        methods: {
            dropListener(e) {
                e.preventDefault();
                //拖拽进来的文件
                const files = Array.from(e.dataTransfer.files);
                //判断是图片还是视频
                //如果都有判断哪个多
                const images = [];
                const videos = [];
                files.map(cur => {
                    const type = cur.type !== "" ? cur.type.split("/")[0] : "";
                    if (type === "video") {
                        videos.push({ id: uuidv4(), url: cur.path });
                    } else if (type === "image") {
                        images.push({ id: uuidv4(), url: cur.path });
                    }
                });
                if (images.length === 0 && videos.length === 0) {
                    return false;
                } else if (images.length > videos.length) {
                    this.$store.commit("addImages", images);
                    if (this.$route.name !== "image") {
                        this.$router.push("/image");
                    }
                } else {
                    this.$store.commit("addVideos", videos);
                    if (this.$route.name !== "video") {
                        this.$router.push("/video");
                    }
                }
            }
        },
        mounted() {
            const { dropListener } = this;
            document.addEventListener("drop", dropListener, false);
            document.addEventListener("dragover", preventDefault, false);
        }
    };
</script>
<style lang="scss">
    #app {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        background-color: transparent;
        overflow: hidden;
        /* background-color: red */
    }
</style>
