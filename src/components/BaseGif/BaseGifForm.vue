<template>
  <div class="base-gif-form">
    <Form auto-label-width>
      <FormItem field="gifWidth" label="宽度">
        <InputNumber v-model="form.gifWidth" placeholder="请输入宽度" :min="1">
          <template #suffix>
            <span style="font-size: 12px">像素</span>
          </template>
        </InputNumber>
        <template #extra>配置动图的宽度</template>
      </FormItem>
      <FormItem field="gifHeight" label="长度">
        <InputNumber v-model="form.gifHeight" placeholder="请输入长度" :min="1">
          <template #suffix>
            <span style="font-size: 12px">像素</span>
          </template>
        </InputNumber>
        <template #extra>配置动图的长度</template>
      </FormItem>
      <FormItem field="frameDuration" label="每帧的时长">
        <InputNumber
          v-model="form.frameDuration"
          placeholder="请输入时长"
          :min="0"
        >
          <template #suffix>
            <span style="font-size: 12px">秒</span>
          </template>
        </InputNumber>
        <template #extra>停留在每张图片上的时间</template>
      </FormItem>
      <FormItem field="numWorkers" label="Worker数量">
        <InputNumber v-model="form.numWorkers" placeholder="请输入数量">
          <template #suffix>
            <span style="font-size: 12px">个</span>
          </template>
        </InputNumber>
        <template #extra>数值越大转化速度越快</template>
      </FormItem>
      <FormItem field="quality" label="质量">
        <Slider v-model="form.quality" :step="1" :min="1" :max="100"></Slider>
        <template #extra>数值越大转化速度越快</template>
      </FormItem>
    </Form>
  </div>
</template>
<script setup lang="ts">
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Slider,
} from '@arco-design/web-vue'
import { ref, computed } from 'vue'

interface PropsType {
  modelValue: any
}
const props = defineProps<PropsType>()
const emit = defineEmits(['update:modelValue'])

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// const form = ref({
//   width: 500,
//   height: 500,
//   frameDuration: 1,
//   work: 10,
// })
</script>
<!-- <style lang="scss" scoped></style> -->
