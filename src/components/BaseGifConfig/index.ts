import { createVNode, render } from "vue"
import BaseGifConfig from "./components/index.vue"
export function gifConfigModal(mode: "image" | "video", resource: any) {
  return new Promise((resolve) => {
    const instance = createVNode(BaseGifConfig, { mode, resolve, resource })
    const template = document.createElement("div")
    render(instance, template)
    const vnode = instance.el as HTMLElement
    document.body.appendChild(vnode)
  })
}
