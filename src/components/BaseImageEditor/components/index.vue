<template>
  <Modal
    v-model:visible="visible"
    ok-text="保存并替换"
    cancel-text="取消编辑"
    width="1000px"
    class="base-image-edit-model"
    unmount-on-close
    draggable
    :esc-to-close="false"
    :mask-closable="false"
    @ok="onConfirm"
    @close="onClose"
  >
    <template #title> 图像编辑 </template>
    <div class="base-image-edit" ref="container"></div>
  </Modal>
</template>
<script setup lang="ts">
  import { useImageEditor } from "../hooks/useImageEditor"
  import { nextTick, onMounted, ref } from "vue"
  import { Modal } from "@arco-design/web-vue"
  interface PropsType {
    url: string
    resolve: (result: string) => any
  }
  const props = defineProps<PropsType>()
  const container = ref<HTMLElement>()
  const { instance } = useImageEditor(container, props.url)
  const visible = ref(true)
  const onConfirm = () => {
    const result = instance.value?.toDataURL() || ""
    props.resolve(result)
  }
  const onClose = () => {
    props.resolve("")
  }
</script>
<style lang="scss">
  .base-image-edit-model {
    .arco-modal-body {
      padding: 0;
    }

    .base-image-edit {
      width: 100%;
      height: 500px !important;
    }
  }
</style>
