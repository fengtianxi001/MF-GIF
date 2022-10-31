<template>
  <div class="layout-bar">
    <BaseLogo />
    <div class="bar-operates">
      <a-tooltip v-for="{ icon, tips, click } in operateList" :content="tips">
        <a-button class="bar-operates-item" type="outline" shape="circle" @click="click">
          <template #icon>
            <component :is="icon" />
          </template>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useFullScreen } from "@/hooks/useFullScreen"
  import { useTheme } from "@/hooks/useTheme"
  import { computed } from "vue"
  import BaseLogo from "@/components/BaseLogo.vue"
  const { themeIcon, themeTips, themeToggle } = useTheme()
  const { screenIcon, screenTips, screenToggle } = useFullScreen()
  const operateList = computed(() => [
    {
      icon: themeIcon.value,
      tips: themeTips.value,
      click: themeToggle,
    },
    {
      icon: screenIcon.value,
      tips: screenTips.value,
      click: screenToggle,
    },
  ])
</script>
<style lang="scss" scoped>
  .layout-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);

    .bar-operates {
      display: flex;
      grid-gap: 14px;
      align-items: center;

      .bar-operates-item {
        color: rgb(var(--gray-8));
        font-size: 16px;
        border-color: rgb(var(--gray-2));
      }
    }
  }
</style>
