<template>
  <Modal
    class="base-gif-config-model"
    v-model:visible="visible"
    ok-text="保存动图"
    cancel-text="取消"
    width="850px"
    unmount-on-close
    draggable
    :esc-to-close="false"
    :mask-closable="false"
    :on-before-ok="onConfirm"
  >
    <template #title> GIF动图配置表单 </template>
    <div class="base-gif-config">
      <BaseForm :configs="config" v-model="form" class="base-gif-config-form"></BaseForm>
      <div class="base-gif-config-preview">
        <div class="config-preview-result">
          <Spin :loading="loading" :tip="'GIF生成中,进度:' + progress + '%'">
            <BaseImage :src="result" :size="300" title="预计图片大小:" :description="size" />
          </Spin>
        </div>
        <div class="config-preview-operate">
          <Tooltip content="点击后,会根据右侧参数生成样片">
            <Button type="primary" size="small" long @click="onPreview">预览</Button>
          </Tooltip>
          <Tooltip
            content="开启实时预览后, 当右侧参数修改会实时更新样片, 如果改动频繁可能会造成卡顿。如果关闭实时预览, 则需要点击样片预览按钮才会更新样片。"
          >
            <Button
              type="primary"
              :status="isLivePreview ? 'success' : 'danger'"
              size="small"
              long
              @click="isLivePreview = !isLivePreview"
            >
              {{ isLivePreview ? "关闭实时预览(目前已开启)" : "开启实时预览(目前已关闭)" }}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
  import { createVNode, onMounted, ref, watchEffect } from "vue"
  import { Modal, Tooltip, Button, Spin, Message } from "@arco-design/web-vue"
  import { IconInfoCircle } from "@arco-design/web-vue/es/icon"
  import { useGifshot } from "@/hooks/useGifshot"
  import { useVisible } from "@/hooks/useVisible"
  import { base64ToBlob } from "@/utils/common"
  import BaseForm from "@/components/BaseForm/index.vue"
  import BaseImage from "@/components/BaseImage.vue"
  import { configs } from "../configs"
  // import example_images from "@/assets/example/images"
  import fileSaver from "file-saver"
  import { computed } from "@vue/reactivity"
  interface PropsType {
    mode: "image" | "video" | "camera"
    resource: string[]
    resolve: (result: any) => any
  }
  const props = defineProps<PropsType>()
  const { visible } = useVisible(true)
  const { loading, progress, result, size, convert } = useGifshot()
  const isLivePreview = ref(false)
  const form = ref({})
  const onConfirm = () => {
    if (!result.value) {
      Message.error("请点击预览按钮,后再保存")
      return Promise.reject(false)
    }
    let blob = base64ToBlob(result.value)
    fileSaver(blob, "mf-gif.gif")
    return Promise.resolve(true)
  }
  const config = computed(() => {
    return configs[props.mode]
  })
  const onPreview = () => {
    if (props.mode === "image") {
      convert({
        ...form.value,
        images: [...props.resource],
      })
    } else if (props.mode === "video") {
      convert({
        ...form.value,
        video: props.resource[0],
      })
    }
  }
  watchEffect(() => {
    if (isLivePreview.value) onPreview()
  })
  //onMounted(onPreview)
</script>
<style lang="scss" scoped>
  .base-gif-config {
    display: flex;
    grid-gap: 40px;

    .base-gif-config-preview {
      position: relative;
      flex-shrink: 0;
      box-sizing: content-box;
      width: 300px;
      border-radius: 4px;

      &::before {
        position: absolute;
        left: -20px;
        height: 100%;
        border-left: 1px solid var(--color-neutral-3);
        content: "";
      }

      .config-preview-result {
        width: 100%;
        margin: 0 0 20px;
        background-color: var(--color-fill-2);
        aspect-ratio: 1/1;
      }

      .config-preview-operate {
        display: grid;
        grid-gap: 10px;
      }
    }
  }
</style>
