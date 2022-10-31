<template>
  <Modal
    class="base-video-player-model"
    v-model:visible="visible"
    ok-text="保存动图"
    cancel-text="取消"
    width="850px"
    unmount-on-close
    draggable
    :footer="false"
  >
    <template #title> 视频播放 </template>
    <div class="base-video-player">
      <video ref="video" controls autoplay />
    </div>
  </Modal>
</template>
<script setup lang="ts">
  import { useVisible } from "@/hooks/useVisible"
  import { Modal } from "@arco-design/web-vue"
  import { useMediaControls } from "@vueuse/core"
  import { ref } from "vue"
  interface PropsType {
    src: string
  }
  const props = defineProps<PropsType>()
  const { visible } = useVisible(true)
  const video = ref()
  const { playing, currentTime, duration, volume } = useMediaControls(video, {
    src: props.src,
  })
</script>
<style lang="scss">
  .base-video-player-model {
    .arco-modal-header {
      display: none !important;
    }

    .arco-modal-body {
      padding: 0;
      font-size: 0;
    }

    video {
      width: 100%;
    }
  }
</style>
