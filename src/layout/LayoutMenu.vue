<template>
  <a-menu
    show-collapse-button
    auto-open-selected
    :style="style"
    v-model:collapsed="collapsed"
    :selected-keys="selectedKey"
    @menu-item-click="onMenuItemClick"
  >
    <a-menu-item v-for="route in routes" :key="route.path">
      <template #icon>
        <component :is="route.meta?.icon" class="menu-icon" />
      </template>
      {{ route.meta?.title ?? route.name }}
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
  import { computed } from "vue"
  import { constant as routes } from "@/router/constant"
  import { useRoute } from "vue-router"
  import router from "@/router"
  const route = useRoute()
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(["update:modelValue"])
  const collapsed = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  })
  const style = computed(() => {
    return {
      position: "fixed",
      width: collapsed.value ? "48px" : "220px",
      height: "calc(100vh - 60px)",
      borderRight: "1px solid var(--color-border)",
    }
  })
  const selectedKey = computed(() => [route.path])
  const onMenuItemClick = (key: string) => router.push(key)
</script>
<style lang="scss" scoped>
  .menu-icon {
    font-size: 18px;
  }
</style>
