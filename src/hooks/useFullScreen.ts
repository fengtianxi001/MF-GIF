import { useFullscreen } from "@vueuse/core"
import { IconFullscreen, IconFullscreenExit } from "@arco-design/web-vue/es/icon"
import { computed } from "vue"

export function useFullScreen() {
  const { isFullscreen: isFull, toggle: screenToggle } = useFullscreen()
  const screenIcon = computed(() => (isFull.value ? IconFullscreenExit : IconFullscreen))
  const screenTips = computed(() => (isFull.value ? "退出全屏" : "进入全屏"))
  return { isFull, screenIcon, screenTips, screenToggle }
}
