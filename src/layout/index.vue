<template>
  <a-layout class="layout">
    <LayoutBar />
    <div class="layout-main">
      <LayoutMenu v-model="collapsed" />
      <LayoutContent :collapsed="collapsed" />
    </div>
  </a-layout>
</template>
<script setup lang="ts">
  import LayoutBar from "./LayoutBar.vue"
  import LayoutMenu from "./LayoutMenu.vue"
  import LayoutContent from "./LayoutContent.vue"
  import { ref } from "vue"
  const collapsed = ref(true)
</script>
<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;

    .layout-main {
      display: flex;
      box-sizing: border-box;
      height: 100%;
      min-height: calc(100vh - 60px);
      margin-top: 60px;
      background-color: var(--color-fill-2);
    }
  }
</style>
