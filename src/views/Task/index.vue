<template>
    <div class="task-page">
        <gallery-result>
            <m-image
                slot="image"
                :src="imageURL"
                :complate="complate"
                :loadText="loadText"
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
                loadText: "正在转换中 0.00%"
            };
        },
        computed: {
            ...mapGetters(["task"]),
            btnOptions() {
                const {
                    complate,
                    downloadGIF,
                    showConfig,
                    rollStep,
                    rollHome
                } = this;
                return [
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
                        condition: complate
                    },
                    {
                        name: "返回上一步",
                        type: "default",
                        event: rollStep,
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
            resetConfig(option) {
                this.complate = false;
                delete option.progressCallback;
                this.$store.commit("setTask", { ...option });
            },
            createGif(option) {
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
        },
        watch: {
            task: {
                deep: true,
                immediate: true,
                handler(task) {
                    this.createGif(task);
                }
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