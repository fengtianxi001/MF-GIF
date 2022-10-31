<template>
  <div class="base-table-filter">
    <BaseForm
      class="filter-form"
      :configs="configs"
      v-model="modelValue"
      layout="inline"
      v-bind="$attrs"
      ref="formRef"
    >
    </BaseForm>
    <BaseButtonGroup class="filter-operate">
      <BaseButton text="筛选" :icon="IconFilter" @click="onQuery" />
      <BaseButton text="重置" :icon="IconRefresh" color="info" @click="onReset" />
    </BaseButtonGroup>
  </div>
</template>
<script setup lang="ts">
  import { isFunction } from "lodash"
  import { ref } from "vue"
  import type { BaseFormConfigType } from "../BaseForm/types"
  import { IconFilter, IconRefresh } from "@arco-design/web-vue/es/icon"
  import BaseForm from "@/components/BaseForm/index.vue"
  import BaseButton from "@/components/BaseButton.vue"
  import BaseButtonGroup from "@/components/BaseButtonGroup.vue"
  interface PropsType {
    configs: BaseFormConfigType[]
    modelValue: any
    query: () => void
    grid?: number
  }
  const props = defineProps<PropsType>()
  const onQuery = () => {
    isFunction(props.query) && props.query()
  }
  const formRef = ref()
  const onReset = () => {
    formRef.value.resetFields({})
    onQuery()
  }
</script>
<style lang="scss" scoped>
  .base-table-filter {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-neutral-3);

    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    :deep(.arco-form-layout-inline .arco-form-item) {
      margin: 0;
    }
    /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
    :deep(.arco-picker-size-medium) {
      width: 100%;
    }
  }

  .filter-form {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    overflow: hidden;
    transition: all 0.35s ease-in-out;
  }

  .filter-operate {
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid var(--color-neutral-3);
  }
</style>
