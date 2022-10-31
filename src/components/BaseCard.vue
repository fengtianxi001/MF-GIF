<template>
  <div class="base-card">
    <div class="base-card-header">{{ title }}</div>
    <div class="base-card-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface PropsType {
    title?: string
  }
  const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
  .base-card {
    width: 100%;
    height: 100%;
    background: var(--color-bg-2);
    border-radius: 4px;

    .base-card-header {
      padding: 20px;
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 16px;
    }

    .base-card-body {
      padding: 0 20px 20px;
    }
  }
</style>
