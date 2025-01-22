import {
  fetchImageDpi,
  filePicker,
  uuid,
  confirm,
  dataURLtoFile,
  formatFileSize,
} from '@/utils'
import { Message } from '@arco-design/web-vue'
import { map, size, remove, uniqBy, uniq, filter } from 'lodash'
import { computed, reactive, ref, h } from 'vue'
// import { ImageEditModal } from '@/components/BaseImageEditor'
import dayjs from 'dayjs'
import { createBaseGifModal } from '@/components'

export interface imageType {
  id: string
  url: string
  name: string
  size: string
  type: string
  dpi: { width: number; height: number }
  file: File
  lastModified: string
}

export function useImage() {
  const images = reactive<imageType[]>([])
  const imageSelected = ref<string[]>([])

  const onAddImages = async () => {
    const files = await filePicker('image/*')
    const primiseList = map(files, onPackageImageItem)
    const result = await Promise.all(primiseList)
    images.push(...result)
    Message.success(`成功导入 ${size(result)} 张图片`)
  }

  const onRemoveImages = async (ids: string[]) => {
    const total = ids.length
    const names = images
      .filter(({ id }) => ids.includes(id))
      .map(({ name }) => {
        return h('div', { class: 'list-dot' }, name)
      })
    const tip = h(
      'div',
      { style: 'margin-bottom:10px' },
      `共 ${total} 条数据，是否移除？`
    )
    const list = h('div', { style: 'max-height:300px;overflow: auto' }, names)
    const result = await confirm({
      content: () => h('div', {}, [tip, list]),
      okText: '移除',
      cancelText: '取消',
    })
    if (!result) return void 0
    const removed = remove(images, ({ id }) => ids.includes(id))
    remove(imageSelected.value, (id) => ids.includes(id))

    Message.success(`成功移除 ${size(removed)} 张图片`)
    return void 0
  }

  const onEditImage = async (record: imageType) => {
    // const result = await ImageEditModal(record.url)
    // if (!result) return void 0
    // const file = dataURLtoFile(result, record.name)
    // const temp = await onPackageImageItem(file)
    // record.url = temp.url
    // record.name = temp.name
    // record.size = temp.size
    // record.type = temp.type
    // record.file = temp.file
    // record.dpi = temp.dpi
    // record.lastModified = temp.lastModified
  }

  const onConvertImage = async () => {
    await createBaseGifModal('image', images)
  }

  const onPackageImageItem = async (file: File): Promise<imageType> => {
    // console.log('file', file)
    const id = uuid()
    const name = file.name
    const url = URL.createObjectURL(file)
    const size = formatFileSize(file.size)
    const type = file.type.split('/')[1]
    const dpi = await fetchImageDpi(url)
    const lastModified = dayjs(file.lastModified).format('YYYY-MM-DD HH:mm:ss')
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
    onAddImages,
    onRemoveImages,
    onEditImage,
    onConvertImage,
  }
}

export default useImage
