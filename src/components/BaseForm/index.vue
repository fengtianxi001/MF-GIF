<template>
  <Form :model="modelValue" v-bind="$attrs" ref="formRef">
    <FormItem
      v-for="config in props.configs"
      :field="config.name"
      :key="config.name"
      :label="config.label"
      :name="config.name"
      v-bind="config.formItemProps"
      :required="config.required"
    >
      <component
        :is="components[config.component]"
        v-model="modelValue[config.name]"
        v-bind="config.props"
        :placeholder="createPlaceholder(config)"
        :allow-clear="true"
      >
        <template #prefix v-if="config.slots?.prefix">
          <component v-if="isVNode(config.slots?.prefix)" :is="config.slots?.prefix"></component>
          <span v-else>{{ config.slots?.prefix }}</span>
        </template>
        <template #suffix v-if="config.slots?.suffix">
          <component v-if="isVNode(config.slots?.suffix)" :is="config.slots?.v"></component>
          <span v-else>{{ config.slots?.suffix }}</span>
        </template>
      </component>
    </FormItem>
  </Form>
</template>
<script setup lang="ts">
  import * as AntComponents from "@arco-design/web-vue"
  import { forEach } from "lodash"
  import { isVNode, onMounted, reactive, ref } from "vue"
  import type { BaseFormConfigType } from "./types"
  import { FormItem, Form } from "@arco-design/web-vue"
  const components = {
    ...AntComponents,
  } as any

  interface PropsType {
    configs: BaseFormConfigType[]
    modelValue: any
  }

  const props = defineProps<PropsType>()
  // const form = reactive<Record<string, any>>({})

  const createPlaceholder = (config: BaseFormConfigType) => {
    if (config?.props?.placeholder) return config.props.placeholder
    const done = config.component === "Input" ? "输入" : "选择"
    return `请${done}${config.label?.replace(":", "")}`
  }

  onMounted(() => {
    forEach(props.configs, (config) => {
      props.modelValue[config.name] = config.defaultValue || void 0
    })
  })

  const formRef = ref()
  const resetFields = () => formRef.value.resetFields()
  const validate = () => formRef.value.validate()
  defineExpose({
    resetFields,
    validate,
  })
</script>
