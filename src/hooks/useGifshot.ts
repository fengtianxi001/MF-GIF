import gifshot from "gifshot"
import { computed, ref, watchEffect } from "vue"
import { dataURLtoFile, formatFileSize } from "@/utils/common"
export function useGifshot() {
  const loading = ref(false)
  const progress = ref("0")
  const result = ref("")
  const onProgress = (val: number) => (progress.value = (val * 100).toFixed(2))
  const onComplete = ({ image, error }: any) => {
    loading.value = false
    if (error) {
      console.log(error)
    } else {
      result.value = image
    }
  }
  const convert = (configs: any) => {
    loading.value = true
    progress.value = "0"
    result.value = ""
    const params = { ...configsParse(configs) }
    console.log("params", params)
    gifshot.createGIF(
      {
        ...params,
        progressCallback: onProgress,
      },
      onComplete
    )
  }
  const configsParse = (configs: any) => {
    const clone = { ...configs }
    if (clone.fontSize !== undefined) {
      clone.fontSize = parseInt(clone.fontSize) + "px"
    }
    if (clone.numFrames !== undefined) {
      clone.numFrames = clone.numFrames * 10
    }
    if (clone.frameDuration !== undefined) {
      clone.frameDuration = clone.frameDuration * 10
    }
    return clone
  }
  const size = computed(() => {
    try {
      const cache = dataURLtoFile(result.value, "test.gif")
      return formatFileSize(cache.size)
    } catch (error) {
      return formatFileSize(0)
    }
  })
  return {
    loading,
    progress,
    result,
    size,
    convert,
  }
}
