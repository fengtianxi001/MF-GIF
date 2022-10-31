import { ref, computed, watchEffect } from "vue"
import { IconMoonFill, IconSunFill } from "@arco-design/web-vue/es/icon"

//获取缓存的主题信息
const getCacheTheme = () => {
  const temp = window.localStorage.getItem("theme") || JSON.stringify({ isDark: false })
  return JSON.parse(temp).isDark as boolean
}
//设置主题信息的缓存
const setCacheTheme = (isDark: boolean) => {
  window.localStorage.setItem("theme", JSON.stringify({ isDark }))
}

export function useTheme() {
  const isDark = ref(getCacheTheme())
  const themeIcon = computed(() => (isDark.value ? IconMoonFill : IconSunFill))
  const themeTips = computed(() => (isDark.value ? "切换浅色主题" : "切换深色主题"))
  const themeToggle = () => (isDark.value = !isDark.value)
  watchEffect(() => {
    document.body.setAttribute("arco-theme", isDark.value ? "dark" : "light")
    setCacheTheme(isDark.value)
  })
  return { isDark, themeIcon, themeTips, themeToggle }
}
