import { createVNode, render } from "vue"
import BaseImageEditVue from "./components/index.vue"
export function ImageEditModal(url: string) {
  return new Promise<string>((resolve) => {
    const instance = createVNode(BaseImageEditVue, { url, resolve })
    const template = document.createElement("div")
    render(instance, template)
    const vnode = instance.el as HTMLElement
    document.body.appendChild(vnode)
  })
}
