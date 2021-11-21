<template>
    <el-dialog
        title="动图参数设置"
        :visible.sync="visible"
        :show-close="false"
        :append-to-body='true'
        width="80%"
    >
        <div class="el-dialog-header">
            <i class="el-icon-s-tools"></i>
            <span>GIF参数设置</span>
        </div>
        <ul class="el-dialog-form">
            <li
                v-for="{props,tips,type,unit,label} in list"
                :key="props"
            >
                <div class="item-right">
                    <el-tooltip :content="tips">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                    <label>{{label}}:</label>
                </div>
                <div class="item-left">
                    <input
                        :type="type"
                        v-model="form[props]"
                    >
                    <div class="unit">{{unit}}</div>
                </div>

            </li>
        </ul>
        <div slot="footer">
            <m-button
                style="margin-right:10px"
                @click="visible= false"
            >取消</m-button>
            <m-button
                @click="submit"
                type="primary"
            >确定</m-button>
        </div>
    </el-dialog>
</template>
<script>
    /*eslint-disable*/
    const defaultOptions = {
        gifWidth: 200,
        gifHeight: 200,
        interval: 1,
        frameDuration: 1,
        text: "",
        fontWeight: "normal",
        fontSize: 16,
        fontColor: "#ffffff",
        textXCoordinate: null,
        textYCoordinate: null
    };
    export default {
        name: "CustomConfig",
        props: {
            defaultProps: Object
        },
        data() {
            return {
                form: { ...defaultOptions },
                list: [
                    {
                        props: "gifWidth",
                        tips: "图像的期望宽度",
                        type: "number",
                        unit: "像素",
                        label: "图像宽度",
                        maxlength: "5"
                    },
                    {
                        props: "gifHeight",
                        tips: "图像的期望高度",
                        type: "number",
                        unit: "像素",
                        label: "图像高度"
                    },
                    {
                        props: "interval",
                        tips: "每帧捕获之间等待的时间(转换视频时,可提升视频长度)",
                        type: "number",
                        unit: "秒",
                        label: "切换间隙"
                    },
                    {
                        props: "frameDuration",
                        tips: "在每张图片上停留的时间(数值越大,切换的越慢)",
                        type: "number",
                        unit: "秒",
                        label: "停留时间"
                    },
                    {
                        props: "text",
                        tips: "在GIF上添加的文本",
                        type: "text",
                        unit: "字符",
                        label: "添加文本"
                    },
                    {
                        props: "fontColor",
                        tips: "GIF文本字体的颜色",
                        type: "color",
                        unit: "色号",
                        label: "文本颜色"
                    },

                    {
                        props: "textXCoordinate",
                        tips: "GIF文本的横坐标(比如水平居中: 输入50)",
                        type: "text",
                        unit: "%",
                        label: "文本横坐标"
                    },
                    {
                        props: "textYCoordinate",
                        tips: "GIF文本的纵坐标(比如垂直居中: 输入50)",
                        type: "text",
                        unit: "%",
                        label: "文本纵坐标"
                    },
                    {
                        props: "fontSize",
                        tips: "GIF文本字体的大小",
                        type: "number",
                        unit: "像素",
                        label: "字体大小"
                    }
                ]
            };
        },
        computed: {
            visible: {
                get() {
                    const visible = this.$attrs.visible;
                    visible && this.resetForm();
                    return visible;
                },
                set(visible) {
                    this.$emit("update:visible", visible);
                }
            }
        },
        methods: {
            submit() {
                // 做一些简单的处理

                // const {
                //     frameDuration,
                //     gifWidth,
                //     gifHeight,
                //     textXCoordinate,
                //     textYCoordinate,
                //     fontSize,
                //     interval
                // } = cache_form;
                // if (
                //     gifWidth <= 0 ||
                //     gifWidth >= 10000 ||
                //     gifHeight <= 0 ||
                //     gifHeight >= 10000
                // ) {
                //     return this.$notify("图片的宽高应在0-10000像素内");
                // }
                // cache_form.textXCoordinate =
                //     gifWidth * (textXCoordinate / 100) || null;
                // cache_form.textYCoordinate =
                //     gifWidth * (textYCoordinate / 100) || null;
                // cache_form.fontSize = fontSize + "px";
                // cache_form.interval = interval / 10;

                // cache_form.frameDuration = frameDuration * 10 || 1;

                const cache = { ...this.form };
                this.$emit("submit", cache);
                this.visible = false;
            },
            resetForm() {
                const cache = Object.assign(defaultOptions, this.defaultProps);
                this.form = { ...cache };
            }
        }
    };
</script>
<style lang='scss' scoped>
    .el-dialog-header {
        height: 40px;
        border-bottom: 1px solid $border_color_dark;
        color: #fff;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
        align-items: center;
        color: #39a476;
        font-weight: bold;
        -webkit-app-region: drag;
        i {
            margin-right: 6px;
            font-size: 18px;
        }
    }
    .el-dialog-form {
        box-sizing: border-box;
        padding: 10px 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        li {
            margin-bottom: 10px;
            position: relative;
            display: flex;
            &:last-child {
                margin-bottom: 0;
            }
            .item-right {
                width: 88px;
                label {
                    display: inline-block;
                    font-size: 13px;
                    color: #fff;
                    text-align: right;
                    margin-left: 4px;
                }
            }

            .item-left {
                position: relative;
                input {
                    background-color: #353739;
                    outline: none;
                    color: #fff;
                    height: 24px;
                    border-radius: 4px;
                    padding-left: 10px;
                    padding-right: 60px;
                    box-sizing: border-box;
                    width: 160px;
                    height: 28px;
                    margin-left: 20px;
                    border: 0;
                    border-radius: 0;
                    &::-webkit-outer-spin-button,
                    &::-webkit-inner-spin-button {
                        // chrome
                        -webkit-appearance: none;
                        appearance: none;
                        margin: 0;
                    }
                }
                .unit {
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    color: #fff;
                    font-size: 12px;
                    background-color: #2e815d;
                    height: 22px;
                    line-height: 22px;
                    width: 48px;
                    border-radius: 2px;
                    text-align: center;
                }
            }
        }
    }
</style>