<template>
  <div class="layout">
    <div class="layout-header">
      <div style="display: flex">
        <LayoutBrand />
        <LayoutMenu />
      </div>
      <div style="display: flex">
        <LayoutActions />
      </div>
    </div>
    <div class="layout-body">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="tsx">
import LayoutBrand from './LayoutBrand.vue'
import LayoutMenu from './LayoutMenu.vue'
import LayoutActions from './LayoutActions.vue'
</script>
<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  .layout-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    background-color: var(--color-menu-light-bg);
    border-bottom: 1px solid var(--color-border);
  }
  .layout-body {
    box-sizing: border-box;
    height: calc(100% - 50px);
    padding: 30px;
    background-color: var(--color-neutral-2);
    background-image: url('@/assets/images/pattern_light.svg');
    background-size: auto 100%;
  }
}
</style>
<style lang="scss">
body[arco-theme='dark'] {
  .layout-body {
    background-image: url('@/assets/images/pattern_dark.svg') !important;
  }
}
body[arco-theme='light'] {
  .layout-body {
    background-image: url('@/assets/images/pattern_light.svg') !important;
  }
}
</style>
