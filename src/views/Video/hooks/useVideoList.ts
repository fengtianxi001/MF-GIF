import { fetchImageDpi, filePicker, uuid, confirm, dataURLtoFile } from "@/utils/common"
import { Message } from "@arco-design/web-vue"
import { map, size, remove, uniqBy, uniq } from "lodash"
import { computed, reactive, ref } from "vue"
import { ImageEditModal } from "@/components/BaseImageEditor"

import dayjs from "dayjs"
import { gifConfigModal } from "@/components/BaseGifConfig"
export interface imageType {
  id: string
  url: string
  name: string
  size: number
  type: string
  file: File
  lastModified: string
}
export function useVideoList() {
  const videos = reactive<imageType[]>([])
  const videoSelected = ref<string[]>([])
  const videoFilterParams = ref<any>({})
  const videoFilterResult = ref<imageType[]>([])
  const videoFilterConfigs = computed<any>(() => {
    return [
      {
        label: "视频名称",
        name: "name",
        component: "Input",
      },
      {
        label: "视频大小",
        name: "size",
        component: "Select",
        props: {
          options: [],
        },
      },
      {
        label: "视频类型",
        name: "type",
        component: "Select",
        props: {
          options: uniq(map(videos, ({ type }) => type.replace("video/", ""))),
        },
      },
    ]
  })

  const onAddVideo = async () => {
    const files = await filePicker("video/*")
    const primiseList = map(files, onPackageVideoItem)
    const result = await Promise.all(primiseList)
    videos.push(...result)
    Message.success(`成功导入 ${size(result)} 个视频`)
    onFilter()
  }
  const onRemoveVideos = async (ids: string[]) => {
    const total = size(ids)
    const result = await confirm({
      content: `共 ${total} 条数据，是否移除？`,
      okText: "确认移除",
      cancelText: "取消操作",
    })
    if (!result) return void 0
    const removed = remove(videos, ({ id }) => ids.includes(id))
    onFilter()
    Message.success(`成功移除 ${size(removed)} 张图片`)
    return void 0
  }
  const onFilter = () => {
    const { name, size, type } = videoFilterParams.value
    let result = [...videos]
    if (name) {
      result = result.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (size) {
    }
    if (type) {
      result = result.filter((item) => item.type.includes(type))
    }
    videoFilterResult.value = result
    videoSelected.value = []
  }
  const onResetFilterResult = (val: any) => {
    videoFilterResult.value = val
  }
  const onConvertImage = async (resource: any) => {
    await gifConfigModal("video", resource)
  }
  const onPackageVideoItem = async (file: File): Promise<imageType> => {
    const id = uuid()
    const name = file.name
    const url = URL.createObjectURL(file)
    const size = file.size
    const type = file.type
    const lastModified = dayjs(file.lastModified).format("YYYY-MM-DD HH:mm:ss")
    return {
      id,
      url,
      name,
      size,
      type,
      file,
      lastModified,
    }
  }
  return {
    videos,
    videoSelected,
    videoFilterParams,
    videoFilterResult,
    videoFilterConfigs,
    onAddVideo,
    onRemoveVideos,
    onFilter,
    onResetFilterResult,
    onConvertImage,
  }
}
