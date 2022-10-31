<template>
  <BaseCard title="图片转GIF">
    <BaseTableFilter v-model="imageFilterParams" :configs="imageFilterConfigs" :query="onFilter" />
    <BaseTableOperate :list="tableOperates" />
    <BaseTable
      v-model:selectedKeys="imageSelected"
      :columns="columns"
      :data="imageFilterResult"
      :draggable="{ type: 'handle', width: 40 }"
      @change="onResetFilterResult"
    />
  </BaseCard>
</template>
<script setup lang="ts">
  import { computed } from "@vue/reactivity"
  import { createVNode } from "vue"
  import { IconPlus, IconDelete, IconPlayArrow, IconEdit } from "@arco-design/web-vue/es/icon"
  import { useImageList } from "./hooks/useImageList"
  import BaseTableOperate from "@/components/BaseTable/BaseTableOperate.vue"
  import BaseTable from "@/components/BaseTable/BaseTable.vue"
  import BaseCard from "@/components/BaseCard.vue"
  import BaseTableFilter from "@/components/BaseTable/BaseTableFilter.vue"
  import BaseButton from "@/components/BaseButton.vue"
  import BaseButtonGroup from "@/components/BaseButtonGroup.vue"
  import BaseImage from "@/components/BaseImage.vue"
  import { size } from "lodash"
  import { Message } from "@arco-design/web-vue"
  const {
    imageSelected,
    imageFilterParams,
    imageFilterResult,
    imageFilterConfigs,
    onAddImages,
    onRemoveImages,
    onEditImage,
    onFilter,
    onResetFilterResult,
    onConvertImage,
  } = useImageList()

  const columns = [
    {
      title: "图片预览",
      width: 90,
      render: ({ record }: any) => createVNode(BaseImage, { src: record.url, size: 40 }),
    },
    {
      title: "图片名称",
      dataIndex: "name",
    },
    {
      title: "图片大小",
      dataIndex: "size",
    },
    {
      title: "图片分辨率",
      dataIndex: "dpi",
    },
    {
      title: "图片类型",
      dataIndex: "type",
    },
    { title: "最后编辑时间", dataIndex: "lastModified" },
    {
      title: "操作",
      width: 100,
      render: ({ record }: any) => {
        return createVNode(BaseButtonGroup, {}, [
          createVNode(BaseButton, {
            text: "编辑",
            icon: IconEdit,
            size: "small",
            onClick: () => onEditImage(record),
          }),
          createVNode(BaseButton, {
            text: "移除",
            color: "danger",
            icon: IconDelete,
            size: "small",
            onClick: () => onRemoveImages([record.id]),
          }),
        ])
      },
    },
  ]
  const tableOperates = computed(() => [
    [
      {
        text: "批量导入",
        icon: IconPlus,
        click: onAddImages,
      },
      {
        text: "批量删除",
        icon: IconDelete,
        click: () => {
          onRemoveImages(imageSelected.value)
        },
        props: {
          color: "danger",
          disabled: imageSelected.value.length === 0,
        },
      },
    ],
    [
      {
        text: `转化选择项( ${size(imageSelected.value)} )`,
        icon: IconPlayArrow,
        click: () => {
          if (size(imageSelected.value) < 2) {
            return Message.error("请至少选择两张图片")
          }
          const resource = imageFilterResult.value.filter((item: any) =>
            imageSelected.value.includes(item.id)
          )
          onConvertImage(resource.map((item) => item.url))
        },
        props: {
          //color: "success",
          disabled: size(imageSelected.value) < 2,
        },
      },
      {
        text: "转化当前页",
        icon: IconPlayArrow,
        click: async () => {
          if (size(imageFilterResult.value) < 2) {
            return Message.error("请至少导入两张图片")
          }
          const resource = imageFilterResult.value.map((item: any) => item.url)
          onConvertImage(resource)
        },
        props: {
          //color: "success",
          disabled: size(imageFilterResult.value) === 0,
        },
      },
    ],
  ])
</script>
