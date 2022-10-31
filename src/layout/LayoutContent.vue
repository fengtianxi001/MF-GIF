<template>
  <div class="layout-content" :style="style">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup lang="ts">
  import { computed } from "@vue/reactivity"

  interface PropsType {
    collapsed: boolean
  }
  const props = defineProps<PropsType>()
  const style = computed(() => {
    return {
      marginLeft: props.collapsed ? "48px" : "220px",
    }
  })
</script>
<style lang="scss" scoped>
  .layout-content {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
  }
</style>
