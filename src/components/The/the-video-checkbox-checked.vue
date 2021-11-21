<template>
	<div
		class="the-video-checkbox-checked"
		v-show="checked.length != 0"
		ref="videoCheckboxChecked"
	>
		<h4>已选中{{ checked.length }}个项目</h4>
		<div class="video-checkbox-list" ref="videoCheckboxCheckedList">
			<custom-video-card
				class="video-checkbox-item"
				v-for="video in checked"
				:key="video.id"
				:data="video"
				size="40px"
			></custom-video-card>
		</div>
	</div>
</template>
<script>
export default {
	name: "theVideoCheckboxChecked",
	props: {
		checked: Array,
	},
	mounted() {
		document.addEventListener("mousewheel", this.mousewheel, false);
	},
	beforeDestroyed() {
		document.removeEventListener("mousewheel", this.mousewheel);
	},
	methods: {
		mousewheel(e) {
			const videoCheckboxChecked = this.$refs.videoCheckboxChecked;
			const videoCheckboxCheckedList = this.$refs
				.videoCheckboxCheckedList;
			if (
				videoCheckboxChecked &&
				videoCheckboxChecked.contains(e.target)
			) {
				let v = e.wheelDelta ? e.wheelDelta : e.detail;
				if (v > 3 || -v > 3) v = -v;
				v > 0
					? (videoCheckboxCheckedList.scrollLeft += 50)
					: (videoCheckboxCheckedList.scrollLeft -= 50);
			}
		},
	},
};
</script>
<style lang='scss'>
.the-video-checkbox-checked {
	padding: 4px 20px !important;
	box-sizing: border-box;
	h4 {
		color: #fff;
		font-size: 12px;
		margin-bottom: 4px;
	}
	.video-checkbox-list {
		display: flex;
		overflow-x: auto;
		&::-webkit-scrollbar {
			width: 2px;
			height: 0px;
		}
	}
	.video-checkbox-item {
		margin-right: 10px;
		flex-shrink: 0;
		&:last-child {
			margin-right: 0;
		}
	}
}
</style>