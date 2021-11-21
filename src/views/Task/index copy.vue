<template>
	<div class="task">
		<custom-double-column>
			<m-image
				:src="imageURL"
				:complate="complate"
				:loadText="loadText"
				slot="right"
			></m-image>
			<div slot="left">
				<m-button
					class="main_button"
					type="primary"
					@click="download"
					v-show="complate"
					>下载图片</m-button
				>
				<m-button
					class="main_button"
					type="primary"
					@click="configVisible = true"
					v-show="complate"
					>修改配置</m-button
				>
				<m-button class="main_button" @click="$router.go(-1)"
					>返回上一步</m-button
				>
				<m-button class="main_button" @click="$router.push('/')"
					>返回首页</m-button
				>
			</div>
		</custom-double-column>

		<custom-config
			:visible.sync="configVisible"
			@submit="resetConfig"
		></custom-config>
	</div>
</template>
<script>
/*eslint-disable*/
import { mapGetters } from "vuex";
export default {
	name: "Task",
	components: {
		MButton: () => import("@/components/Base/m-button"),
		MProcess: () => import("@/components/Base/m-process"),
		MImage: () => import("@/components/Base/m-image"),
		CustomConfig: () => import("@/components/Custom/custom-config.vue"),
		CustomDoubleColumn: () =>
			import("@/components/Custom/custom-double-column.vue"),
	},
	data() {
		return {
			complate: false,
			process: 0,
			imageURL: null,
			configVisible: false,
			loadText: "正在转换中 0.00%",
		};
	},
	computed: {
		...mapGetters(["tasks"]),
	},
	mounted() {
		this.type = this.$route.params.type;
	},
	destroyed() {},
	methods: {
		resetConfig(params) {
			params[this.type] = this.tasks[this.type];
			this.complate = false;
			this.$store.commit("setTasks", { ...params });
		},
		download() {
			var blob = new Blob([""], {
				type: "application/octet-stream",
			});
			var url = URL.createObjectURL(blob);
			var a = document.createElement("a");
			a.href = this.imageURL;
			a.download = `img2Gif${new Date().getTime()}`;
			var e = document.createEvent("MouseEvents");
			e.initMouseEvent(
				"click",
				true,
				false,
				window,
				0,
				0,
				0,
				0,
				0,
				false,
				false,
				false,
				false,
				0,
				null
			);
			a.dispatchEvent(e);
			URL.revokeObjectURL(url);
		},
	},
	watch: {
		tasks: {
			deep: true,
			immediate: true,
			handler(tasks) {
				// const options = this.$store.getters.taskimages;
				tasks.progressCallback = (captureProgress) => {
					this.process = captureProgress;
					this.loadText = `正在转换中 ${(
						captureProgress * 100
					).toFixed(2)}%`;
				};
				const gifshot = window.gifshot;
				gifshot.createGIF(tasks, (res) => {
					if (res.error) {
						return this.$notify(res.errMsg);
					} else {
						const { image } = res;
						this.complate = true;
						this.imageURL = image;
					}
				});
			},
		},
	},
};
</script>
<style lang='scss' scoped>
.task {
	width: 100%;
	/* background-color: red; */
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.task_process {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		marquee {
			margin-top: 10px;
			color: #38a576;
			font-weight: bolder;
			font-size: 13px;
		}
	}
	.task_result {
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 150px;
		img {
			width: 180px;
			height: auto;
			border: 10px solid #39a476;
			border-radius: 10px;
			margin-right: 100px;
		}
		.main_button {
			width: 170px;
			margin-top: 10px;
			height: 42px;
			text-align: center;
			line-height: 42px;
			font-size: 13px;
		}
		& > div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>