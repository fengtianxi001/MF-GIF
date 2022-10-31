import { createVNode, render } from "vue"
import BaseVideoPlayerModal from "./components/index.vue"
export function videoPlayerModal(src: string) {
  return new Promise((resolve) => {
    const instance = createVNode(BaseVideoPlayerModal, { src, resolve })
    const template = document.createElement("div")
    render(instance, template)
    const vnode = instance.el as HTMLElement
    document.body.appendChild(vnode)
  })
}
