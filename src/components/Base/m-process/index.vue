<template>
    <div class="m-progress">
        <div class="progress-text">{{percent}}</div>
        <div
            class="progress-bar"
            :style="{width: percent}"
        >
            <div class="progress-text">{{percent}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "MProcess",
        props: {
            process: {
                type: Number,
                default: 0
            }
        },
        computed: {
            percent() {
                const { process } = this;
                try {
                    const cache = (process * 100).toFixed(2) + "%";
                    return cache;
                } catch (error) {
                    return "0%";
                }
            }
        }
    };
</script>
<style lang='scss' scoped>
    .m-progress {
        width: 500px;
        max-width: 500px;
        height: 20px;
        position: relative;
        z-index: 5;
        background: #484848;
        border: 10px solid #171717;
        border-radius: 20px;
        overflow: hidden;
        display: inline-block;
        box-shadow: 0 5px 17px rgb(40 40 40 / 50%),
            0 0 3px 1px rgb(40 40 40 / 50%) inset;
        .progress-text {
            position: absolute;
            font: bold 14px / 20px Arial;
            text-align: center;
            top: 0;
            left: 0;
            width: 500px;
            max-width: 500px;
            height: 20px;
            &:first-child {
                z-index: 5;
                color: white;
                position: absolute;
            }
            &:last-child {
                z-index: 10;
                color: #fff;
            }
        }

        .progress-bar {
            width: 90%;
            max-width: 500px;
            height: 20px;
            overflow: hidden;
            position: relative;
            z-index: 10;
            border-radius: 12px;
            background-color: #2f8f65;
            box-shadow: 0 0 6px 2px rgb(255 255 255 / 30%) inset;
            background-image: linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.35) 25%,
                rgba(255, 255, 255, 0) 25%,
                rgba(255, 255, 255, 0) 50%,
                rgba(255, 255, 255, 0.35) 50%,
                rgba(255, 255, 255, 0.35) 75%,
                rgba(255, 255, 255, 0) 75%,
                rgba(255, 255, 255, 0)
            );
            background-repeat: repeat-x;
            background-size: 20px 20px;
            -webkit-animation: candystripe 1s linear infinite;
            -moz-animation: candystripe 1s linear infinite;
            animation: candystripe 1s linear infinite;
        }
    }
    @keyframes candystripe {
        100% {
            background-position: 20px 0;
        }
    }
</style>