<template>
  <div class="page">
    <button @click="onclick()">clickme</button>
    <!-- <BaseTable
      v-model:selected="imageSelected"
      :operates="operates"
      :columns="columns"
      :data="images"
    /> -->
  </div>
</template>
<script setup lang="tsx">
import { fileChooser } from '@/utils/file'

const onclick = async () => {
  const files = await fileChooser('image/*')
  console.log('files', files)
}

// import { BaseTable, BaseSpace, BaseLink } from '@/components'
// import { useImage } from './useImage'
// import { computed } from 'vue'
// import Profile from './profile.vue'

// const {
//   images,
//   imageSelected,
//   onAddImages,
//   onRemoveImages,
//   onEditImage,
//   onConvertImage,
// } = useImage()

// const operates = computed(() => [
//   {
//     text: '批量导入',
//     type: 'primary',
//     onClick: () => onAddImages(),
//   },
//   {
//     text: '批量删除',
//     type: 'primary',
//     disabled: imageSelected.value.length <= 0,
//     onClick: () => onRemoveImages(imageSelected.value),
//   },
//   {
//     text: '开始转化',
//     type: 'primary',
//     // disabled: images.length <= 0,
//     onClick: () => onConvertImage(),
//   },
// ])

// const columns = [
//   {
//     title: '基础信息',
//     dataIndex: 'name',
//     width: 400,
//     render: ({ record }: any) => <Profile data={record} />,
//   },
//   {
//     title: '图片分辨率',
//     dataIndex: 'dpi',
//     align: 'center',
//     render: ({ record }: any) => `${record.dpi.width} * ${record.dpi.height}`,
//   },
//   {
//     title: '图片类型',
//     dataIndex: 'type',
//     align: 'center',
//   },
//   {
//     title: '最后编辑时间',
//     dataIndex: 'lastModified',
//     align: 'center',
//   },
//   {
//     title: '操作',
//     width: 140,
//     align: 'center',
//     render: ({ record }: any) => {
//       return (
//         <BaseSpace size="small">
//           <BaseLink onClick={() => onEditImage(record.id)}>编辑</BaseLink>
//           <BaseLink onClick={() => onRemoveImages([record.id])}>移除</BaseLink>
//         </BaseSpace>
//       )
//     },
//   },
// ]
</script>
<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: var(--color-bg-1);
  border: 1px solid var(--color-border);
  .page-title {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-neutral-8);
  }
}
</style>
