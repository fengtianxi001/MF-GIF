<template>
  <Modal
    class="base-camera-model"
    v-model:visible="visible"
    ok-text="保存录像"
    cancel-text="取消"
    width="700px"
    unmount-on-close
    draggable
    :on-before-ok="onConfirm"
    @before-close="onCloseCamera"
  >
    <template #title> 摄像头录制 </template>
    <div class="base-camera-body" ref="container">
      <div class="base-camera-operate">
        <BaseButton
          v-show="status === 'waiting'"
          text="开始录制"
          size="small"
          color="primary"
          :icon="IconRecord"
          @click="onStartRecorder"
        />
        <BaseButton
          v-show="status === 'end'"
          text="重新录制"
          size="small"
          color="primary"
          :icon="IconRecord"
          @click="onStartRecorder"
        />
        <BaseButton
          v-show="status === 'recording'"
          text="停止录制"
          size="small"
          color="danger"
          :icon="IconRecordStop"
          @click="onStopRecorder"
        />
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
  import { useVisible } from "@/hooks/useVisible"
  import { IconVideoCamera, IconRecordStop, IconRecord } from "@arco-design/web-vue/es/icon"
  import { Message, Modal } from "@arco-design/web-vue"
  import BaseButton from "@/components/BaseButton.vue"
  import { onMounted, ref } from "vue"
  import { useCamera } from "@/hooks/useCamera"
  interface PropsType {
    resolve: (result: Blob) => {}
  }
  const props = defineProps<PropsType>()
  const { visible } = useVisible(true)
  const container = ref()
  const { status, data, onOpenCamera, onCloseCamera, onStartRecorder, onStopRecorder } =
    useCamera(container)
  const onConfirm = () => {
    if (status.value === "recording") {
      Message.error("请先停止录像")
      return false
    } else if (status.value === "waiting") {
      Message.error("请先开始录像")
      return false
    } else {
      props.resolve(new Blob(data.value))
      return true
    }
  }
  onMounted(() => {
    onOpenCamera()
  })
</script>
<style lang="scss">
  .base-camera-model {
    .arco-modal-body {
      padding: 0;
      font-size: 0;
    }

    .base-camera-body {
      position: relative;

      .base-camera-operate {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 999;
        display: flex;
        grid-gap: 10px;
      }
    }
  }
</style>
