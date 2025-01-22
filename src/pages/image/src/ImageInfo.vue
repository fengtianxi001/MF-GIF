<template>
  <div class="image-info">
    <Image :src="data.url" :width="50" :height="34" fit="cover" />
    <div class="info-base">
      <div class="info-name">{{ data.name }}</div>
      <div class="info-size">{{ data.size }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Image } from '@arco-design/web-vue'
import { imageType } from '../hooks/useImage.hook'

interface PropsType {
  data: imageType
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.image-info {
  display: flex;
  align-items: center;
  .info-base {
    margin-left: 8px;
    .info-name {
      width: 300px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-size {
      font-size: 12px;
      color: var(--color-neutral-6);
    }
  }
}
</style>
