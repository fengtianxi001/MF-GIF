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
  dpi: string
  file: File
  lastModified: string
}
export function useImageList() {
  const images = reactive<imageType[]>([])
  const imageSelected = ref<string[]>([])
  const imageFilterParams = ref<any>({})
  const imageFilterResult = ref<imageType[]>([])
  const imageFilterConfigs = computed<any>(() => {
    return [
      {
        label: "图片名称",
        name: "name",
        component: "Input",
      },
      {
        label: "图片尺寸",
        name: "size",
        component: "Select",
        props: {
          options: [
            {
              label: "大图片(1M以上)",
              value: 3,
            },
            {
              label: "中图片(500kb-1M)",
              value: 2,
            },
            {
              label: "小图片(0kb-500kb)",
              value: 1,
            },
          ],
        },
      },
      {
        label: "图片类型",
        name: "type",
        component: "Select",
        props: {
          options: uniq(map(images, ({ type }) => type)),
        },
      },
    ]
  })

  const onAddImages = async () => {
    const files = await filePicker("image/*")
    const primiseList = map(files, onPackageImageItem)
    const result = await Promise.all(primiseList)
    images.push(...result)
    Message.success(`成功导入 ${size(result)} 张图片`)
    onFilter()
  }
  const onRemoveImages = async (ids: string[]) => {
    const total = size(ids)
    const result = await confirm({
      content: `共 ${total} 条数据，是否移除？`,
      okText: "确认移除",
      cancelText: "取消操作",
    })
    if (!result) return void 0
    const removed = remove(images, ({ id }) => ids.includes(id))
    onFilter()
    Message.success(`成功移除 ${size(removed)} 张图片`)
    return void 0
  }
  const onEditImage = async (record: imageType) => {
    const result = await ImageEditModal(record.url)
    if (!result) return void 0
    const file = dataURLtoFile(result, record.name)
    const temp = await onPackageImageItem(file)
    record.url = temp.url
    record.name = temp.name
    record.size = temp.size
    record.type = temp.type
    record.file = temp.file
    record.dpi = temp.dpi
    record.lastModified = temp.lastModified
  }
  const onFilter = () => {
    const { name, size, type } = imageFilterParams.value
    let result = [...images]
    if (name) {
      result = result.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (size) {
    }
    if (type) {
      result = images.filter((item) => item.type === type)
    }
    imageFilterResult.value = result
    imageSelected.value = []
  }
  const onResetFilterResult = (val: any) => {
    imageFilterResult.value = val
  }
  const onConvertImage = async (resource: any) => {
    await gifConfigModal("image", resource)
    // console.log("result", result)
  }
  const onPackageImageItem = async (file: File): Promise<imageType> => {
    const id = uuid()
    const name = file.name
    const url = URL.createObjectURL(file)
    const size = file.size
    const type = file.type
    const dpi = await fetchImageDpi(url)
    const lastModified = dayjs(file.lastModified).format("YYYY-MM-DD HH:mm:ss")
    return {
      id,
      url,
      name,
      size,
      type,
      file,
      dpi,
      lastModified,
    }
  }
  return {
    images,
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
  }
}
