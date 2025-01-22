<template>
  <Modal
    v-model:visible="visible"
    class="base-gif"
    title="参数配置"
    width="850px"
    unmount-on-close
    draggable
    :esc-to-close="false"
    :mask-closable="false"
  >
    <BaseGifForm v-model="form" />
    <BaseGifPreview :data="gifshot" />

    <template #footer>
      <Button @click="methods.onBeforeClose">关闭</Button>
      <Button @click="methods.onPreview" type="primary">预览</Button>
      <Button @click="methods.onDownload" type="primary">保存</Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { createVNode, onMounted, ref, reactive, computed } from 'vue'
import { Modal, Message, Button } from '@arco-design/web-vue'
import { max } from 'lodash'
import { useGifshot } from '@/hooks'
import BaseGifForm from './BaseGifForm.vue'
import BaseGifPreview from './BaseGifPreview.vue'

interface PropsType {
  mode: 'image' | 'video' | 'camera'
  resource: string[]
  resolve: (result: any) => any
}
const props = defineProps<PropsType>()

const visible = ref(true)

const form = reactive({
  gifWidth: 500,
  gifHeight: 500,
  frameDuration: 1,
  numWorkers: 10,
  quality: 100,
})

const gifshot = useGifshot()

const methods = {
  onPreview() {
    const { frameDuration, numWorkers, gifWidth, gifHeight, quality } = form
    const params = {
      frameDuration,
      numWorkers,
      gifWidth: gifWidth * (quality / 100),
      gifHeight: gifHeight * (quality / 100),
    }
    if (props.mode == 'image') {
      params.images = props.resource.map(({ url }) => url)
    }
    gifshot.convert(params)
  },
  onDownload() {},
  onBeforeClose() {
    visible.value = false
  },
}

onMounted(() => {
  if (props.mode === 'image') {
    form.gifWidth = max(props.resource.map((item) => item.dpi.width))
    form.gifHeight = max(props.resource.map((item) => item.dpi.height))
  }
})
</script>
<style lang="scss">
.base-gif {
  .arco-modal-body {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 300px auto;
    grid-gap: 20px;
  }
}
</style>
