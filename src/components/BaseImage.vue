<template>
  <a-image v-bind="{ ...imageProps }"></a-image>
</template>
<script setup lang="ts">
  import { Image as AImage } from "@arco-design/web-vue"
  import { computed } from "vue"
  interface PropsType {
    src: string
    size?: number
  }
  const props = defineProps<PropsType>()
  const imageProps = computed<any>(() => {
    return {
      src: props.src,
      width: props.size,
      height: props.size,
      fit: "cover",
    }
  })
</script>
