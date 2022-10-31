import { ref } from "vue"

export function useVisible(defaultValue: boolean = false) {
  const visible = ref(defaultValue)
  const hide = () => (visible.value = false)
  const show = () => (visible.value = true)
  const toggle = () => (visible.value = !visible.value)
  return {
    visible,
    hide,
    show,
    toggle,
  }
}
