<template>
	<div>
		<gallery-container>
			<m-button-group slot="operate" :options="buttonOptions" />
			<the-video-checkbox
				slot="content"
				ref="theVideoCheckbox"
				:checked.sync="checked"
			/>
			<the-video-checkbox-checked slot="fixed" :checked="checked" />
		</gallery-container>
		<custom-config :visible.sync="configVisible" @submit="submit" />
	</div>
</template>
<script>
/*eslint-disable*/
export default {
	name: "VideoPage",
	data() {
		return {
			checked: [],
			isCheckAll: false,
			configVisible: false,
			videos: [],
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
				checked,
			} = this;
			return [
				{
					name: "返回首页",
					type: "default",
					condition: true,
					event: () => {
						this.$router.push("/home");
					},
				},
				{
					name: "全选",
					type: "default",
					condition: !isCheckAll,
					event: checkAll,
				},
				{
					name: "取消选择",
					type: "default",
					condition: checked.length > 0,
					event: deCheckAll,
				},
				{
					name: "删除选中项",
					type: "default",
					condition: checked.length > 0,
					event: deleteChecked,
				},
				{
					name: "转化选中项",
					type: "primary",
					condition: checked.length > 0,
					event: translateChecked,
				},
				{
					name: "全部转换",
					type: "primary",
					condition: true,
					event: translateAll,
				},
			];
		},
	},
	methods: {
		checkAll() {
			this.$refs.theVideoCheckbox.checkAll();
		},
		deCheckAll() {
			this.$refs.theVideoCheckbox.deCheckAll();
		},

		deleteChecked() {
			this.$refs.theVideoCheckbox.deleteChecked();
		},
		translateAll() {
			const videos = this.$store.getters.videos;
			const length = videos.length;
			if (length === 0) return this.$notify("请添加图片资源");
			this.configVisible = true;
			this.videos = videos;
		},
		translateChecked() {
			//转换选中项
			const length = this.checked.length;
			if (length === 0) return this.$notify("至少勾选一项");
			this.configVisible = true;
			this.videos = this.checked;
		},
		submit(_option) {
			const videos = this.videos.map((cur) => cur.url);
			const option = {
				..._option,
				video: videos,
			};
			this.$store.commit("setTask", option);
			this.$router.push("/task");
		},
	},
};
</script>
<style lang='scss' scoped>
</style>