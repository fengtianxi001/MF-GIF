<template>
  <Table
    row-key="id"
    :columns="columns"
    :data="data"
    :bordered="false"
    :row-selection="rowSelection"
    :pagination="false"
  />
</template>
<script setup lang="ts">
  import { Table, type TableRowSelection } from "@arco-design/web-vue"
  import { reactive } from "vue"
  interface PropsType {
    columns: any[]
    data: any[]
    // modelValue: any[]
  }
  // const emit = defineEmits(["update:modelValue"])
  const props = defineProps<PropsType>()
  const rowSelection = reactive<TableRowSelection>({
    type: "checkbox",
    showCheckedAll: true,
    onlyCurrent: false,
  })
</script>
<!-- <style lang="scss" scoped></style> -->
