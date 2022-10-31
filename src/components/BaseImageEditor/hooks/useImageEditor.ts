import { nextTick, onMounted, ref, type Ref } from "vue"
import { locale_zh } from "../config"
import ImageEditor from "tui-image-editor"
import "tui-image-editor/dist/tui-image-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"
import "../style/index.scss"
export function useImageEditor(container: Ref<HTMLElement | undefined>, url: string) {
  const instance = ref<ImageEditor>()
  const initialize = () => {
    instance.value = new ImageEditor(container.value as HTMLElement, {
      includeUI: {
        loadImage: {
          path: url,
          name: "image",
        },
        initMenu: "draw",
        menuBarPosition: "right",
        //@ts-ignore
        locale: locale_zh,
      },
      cssMaxWidth: 500,
      cssMaxHeight: 500,
    })
  }
  const onSave = () => {
    return instance.value?.toDataURL()
  }
  onMounted(() => {
    nextTick(() => {
      initialize()
    })
  })
  return {
    instance,
    onSave,
  }
}
