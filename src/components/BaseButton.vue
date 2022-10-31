<template>
  <Button @click="emit('click')" v-bind="{ ...buttonStyle }">
    <template #default>{{ text }}</template>
    <template #icon v-if="icon">
      <component :is="icon"></component>
    </template>
  </Button>
</template>
<script setup lang="ts">
  import { computed } from "vue"
  import { Button } from "@arco-design/web-vue"
  interface PropsType {
    text: string
    icon?: any
    color?: "primary" | "danger" | "success" | "warning" | "info"
  }
  const props = defineProps<PropsType>()
  const emit = defineEmits(["click"])
  const buttonStyle = computed<any>(() => {
    if (!props.color || props.color === "primary") {
      return {
        type: "primary",
        status: "normal",
      }
    } else if (props.color !== "info") {
      return {
        type: "primary",
        status: props.color,
      }
    } else {
      return {}
    }
  })
</script>
