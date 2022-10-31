import { createVNode, render } from "vue"
import BaseVideoPlayerModal from "./components/index.vue"
export function cameraModal() {
  return new Promise<Blob>((resolve) => {
    const instance = createVNode(BaseVideoPlayerModal, { resolve })
    const template = document.createElement("div")
    render(instance, template)
    const vnode = instance.el as HTMLElement
    document.body.appendChild(vnode)
  })
}
