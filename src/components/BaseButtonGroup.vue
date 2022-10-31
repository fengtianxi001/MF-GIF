<template>
  <div class="base-button-group" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import { computed } from "@vue/reactivity"

  interface PropsType {
    gap?: number
  }
  const props = defineProps<PropsType>()
  const style = computed(() => {
    return {
      gridGap: (props.gap ?? 10) + "px",
    }
  })
</script>
<style lang="scss" scoped>
  .base-button-group {
    display: flex;
    grid-gap: 10px;
  }
</style>
