import { Modal, type ModalConfig } from "@arco-design/web-vue"

export function confirm(config: ModalConfig) {
  const { title, titleAlign, content, okText, cancelText } = config
  return new Promise((resolve) => {
    Modal.open({
      simple: true,
      title: title || "一条来自肛肠科冯主任的提醒:",
      titleAlign: titleAlign || "start",
      content: content || "你确定要这么做吗?",
      okText: okText || "确认",
      cancelText: cancelText || "取消",
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}

export function filePicker(accept: string) {
  return new Promise<File[]>((resolve) => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = accept
    input.click()
    input.onchange = () => {
      const files = input.files as FileList
      resolve(Array.from(files))
    }
  })
}

export function fetchImageDpi(src: string) {
  return new Promise<string>((resolve) => {
    const image = new Image()
    image.src = src
    image.onload = () => resolve(`${image.width} * ${image.height}`)
  })
}

export function uuid() {
  var s = []
  var hexDigits = "0123456789abcdef"
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4"
  //@ts-ignore
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = "-"

  var uuid = s.join("")
  return uuid
}

//dataURL转File
export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(",")
  const mime = arr?.[0]?.match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export function formatFileSize(fileSize: number) {
  if (fileSize < 1024) {
    return fileSize + "B"
  } else if (fileSize < 1024 * 1024) {
    return (fileSize / 1024).toFixed(2) + "KB"
  } else if (fileSize < 1024 * 1024 * 1024) {
    return (fileSize / (1024 * 1024)).toFixed(2) + "MB"
  } else {
    return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }
}

export function base64ToBlob(code: string) {
  let parts = code.split(";base64,")
  let contentType = parts[0].split(":")[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length
  let uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], {
    type: contentType,
  })
}
