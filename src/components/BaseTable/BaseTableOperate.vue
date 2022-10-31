<template>
  <div class="base-table-operate">
    <BaseButtonGroup v-for="(items, index) in list" :key="index">
      <BaseButton
        v-for="({ text, icon, props, click }, sequence) in items"
        :key="sequence"
        :text="text"
        :icon="icon"
        v-bind="props"
        @click="click"
      />
    </BaseButtonGroup>
  </div>
</template>
<script setup lang="ts">
  import BaseButton from "@/components/BaseButton.vue"
  import BaseButtonGroup from "@/components/BaseButtonGroup.vue"
  interface PropsType {
    list: Array<
      {
        text: string
        icon?: any
        props?: Record<string, any>
        click?: () => void
        color?: string
      }[]
    >
  }
  const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
  .base-table-operate {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
</style>
