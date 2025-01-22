<template>
  <div class="base-gif-preview">
    progress:{{ data.progress }}

    result: {{ data.result }} loading: {{ data.loading }}

    <img class="preview-image" :src="data.result" />
  </div>
</template>
<script setup lang="ts">
import { Image } from '@arco-design/web-vue'

interface PropsType {
  data: any
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-gif-preview {
  width: 100%;
  height: 100%;
  background-color: var(--color-fill-2);
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
