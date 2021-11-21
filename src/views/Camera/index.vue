<template>
    <div class="task-page">
        <gallery-result>
            <m-image
                slot="image"
                :src="imageURL"
                :complate="complate"
                :loadText="loadText"
                :spinner="loadIcon"
            ></m-image>
            <template slot="operate">
                <m-button
                    v-for="{name,type,event,condition} in btnOptions"
                    :key="name"
                    :type="type"
                    @click="event"
                    v-show="condition"
                >{{name}}</m-button>
            </template>
        </gallery-result>
        <custom-config
            :visible.sync="configVisible"
            @submit="resetConfig"
            :defaultProps="task"
        ></custom-config>
    </div>
</template>
<script>
    /*eslint-disable*/
    import { mapGetters } from "vuex";
    import utils from "@/utils/index.js";
    export default {
        name: "TaskPage",
        data() {
            return {
                complate: false,
                process: 0,
                imageURL: null,
                configVisible: false,
                loadText: "正在等待录制",
                loadIcon: "el-icon-video-camera"
            };
        },
        computed: {
            ...mapGetters(["task"]),
            btnOptions() {
                const {
                    complate,
                    downloadGIF,
                    record,
                    showConfig,
                    rollHome
                } = this;
                return [
                    {
                        name: "开始录制",
                        type: "primary",
                        event: record,
                        condition: true
                    },
                    {
                        name: "下载图片",
                        type: "primary",
                        event: downloadGIF,
                        condition: complate
                    },

                    {
                        name: "修改配置",
                        type: "primary",
                        event: showConfig,
                        condition: true
                    },
                    {
                        name: "返回首页",
                        type: "default",
                        event: rollHome,
                        condition: true
                    }
                ];
            }
        },
        methods: {
            record(option = {}) {
                this.loadIcon = "el-icon-loading";
                this.complate = false
                delete option.progressCallback;
                option.progressCallback = captureProgress => {
                    const process = (captureProgress * 100).toFixed(2);
                    this.loadText = `正在转换中 ${process}%`;
                };
                utils
                    .createGif(option)
                    .then(res => {
                        const { image } = res;
                        this.complate = true;
                        this.imageURL = image;
                    })
                    .catch(error => this.$notify(error));
            },
            resetConfig(option) {
                this.record(option);
            },
            showConfig() {
                this.configVisible = true;
            },
            downloadGIF() {
                const { imageURL } = this;
                utils.downloadGIF(imageURL);
            },
            showConfig() {
                this.configVisible = true;
            },
            rollStep() {
                this.$router.go(-1);
            },
            rollHome() {
                this.$router.push("/");
            }
        }
    };
</script>
<style lang='scss' scoped>
    .task-page {
        width: 100%;
        height: 100%;
    }
</style>