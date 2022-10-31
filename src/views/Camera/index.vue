<template>
  <BaseCard title="录像转GIF">
    <BaseTableFilter v-model="videoFilterParams" :configs="videoFilterConfigs" :query="onFilter" />
    <BaseTableOperate :list="tableOperates" />
    <BaseTable
      v-model:selectedKeys="videoSelected"
      :columns="columns"
      :data="videoFilterResult"
      :draggable="{ type: 'handle', width: 40 }"
      @change="onResetFilterResult"
    />
  </BaseCard>
</template>
<script setup lang="ts">
  import { computed } from "@vue/reactivity"
  import { createVNode } from "vue"
  import {
    IconPlus,
    IconDelete,
    IconPlayArrow,
    IconEdit,
    IconCamera,
    IconVideoCamera,
  } from "@arco-design/web-vue/es/icon"
  import { useVideoList } from "./hooks/useVideoList"
  import BaseTableOperate from "@/components/BaseTable/BaseTableOperate.vue"
  import BaseTable from "@/components/BaseTable/BaseTable.vue"
  import BaseCard from "@/components/BaseCard.vue"
  import BaseTableFilter from "@/components/BaseTable/BaseTableFilter.vue"
  import BaseButton from "@/components/BaseButton.vue"
  import BaseButtonGroup from "@/components/BaseButtonGroup.vue"
  import { videoPlayerModal } from "@/components/BaseVideoPlayer"
  import { size } from "lodash"
  import { Message } from "@arco-design/web-vue"
  import { formatFileSize } from "@/utils/common"
  const {
    videoSelected,
    videoFilterParams,
    videoFilterResult,
    videoFilterConfigs,
    onCamera,
    onRemoveVideos,
    onFilter,
    onResetFilterResult,
    onConvertImage,
  } = useVideoList()

  const columns = [
    {
      title: "录像名称",
      dataIndex: "name",
    },
    {
      title: "录像大小",
      render: ({ record }: any) => formatFileSize(record.size),
    },
    { title: "最后编辑时间", dataIndex: "lastModified" },
    {
      title: "操作",
      width: 100,
      render: ({ record }: any) => {
        return createVNode(BaseButtonGroup, {}, [
          createVNode(BaseButton, {
            text: "播放",
            icon: IconPlayArrow,
            size: "small",
            onClick: () => {
              videoPlayerModal(record.url)
            },
          }),
          createVNode(BaseButton, {
            text: "移除",
            color: "danger",
            icon: IconDelete,
            size: "small",
            onClick: () => onRemoveVideos([record.id]),
          }),
        ])
      },
    },
  ]
  const tableOperates = computed(() => [
    [
      {
        text: "开始录像",
        icon: IconVideoCamera,
        click: onCamera,
      },
      {
        text: "批量移除",
        icon: IconDelete,
        click: () => {
          onRemoveVideos(videoSelected.value)
        },
        props: {
          color: "danger",
          disabled: size(videoSelected.value) === 0,
        },
      },
    ],
    [
      {
        text: `转化选择项( ${size(videoSelected.value)} )`,
        icon: IconPlayArrow,
        click: () => {
          if (size(videoSelected.value) > 1) {
            return Message.error("一次只能选择转换一个视频文件")
          }
          const resource = videoFilterResult.value.filter((item: any) =>
            videoSelected.value.includes(item.id)
          )
          onConvertImage(resource.map((item) => item.url))
        },
        props: {
          disabled: size(videoSelected.value) < 1,
        },
      },
    ],
  ])
</script>
