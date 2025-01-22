export const FileUtils = {
  getId() {
    const cache = []
    const hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      cache[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    cache[14] = '4'
    //@ts-ignore
    cache[19] = hexDigits.substr((cache[19] & 0x3) | 0x8, 1)
    cache[8] = cache[13] = cache[18] = cache[23] = '-'
    const uuid = cache.join('')
    return uuid
  },
  getSize(blob: Blob) {
    const sizeInBytes = blob.size // 获取文件大小（字节）
    const units = ['Bytes', 'KB', 'MB', 'GB']
    let index = 0
    let size = sizeInBytes
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024
      index++
    }
    return `${size.toFixed(2)} ${units[index]}`
  },
  formatSize(size: number) {
    const units = ['Bytes', 'KB', 'MB', 'GB']
    let index = 0
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024
      index++
    }
    return `${size.toFixed(2)} ${units[index]}`
  },
  chooser(accept: string) {
    return new Promise<File[]>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = true
      input.accept = accept
      input.click()
      input.addEventListener(
        'change',
        () => resolve(Array.from(input.files as FileList)),
        { once: true }
      )
      input.onchange = () => {}
    })
  },
  urlToU8A(url: string) {
    const parts = url.split(',')
    const type = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const leng = raw.length
    const uInt8Array = new Uint8Array(leng)
    for (let i = 0; i < leng; ++i) {
      uInt8Array[i] = raw.charCodeAt(i)
    }
    return {
      data: uInt8Array,
      type,
    }
  },
  urlToFile(url: string, name = 'notitled') {
    const { data, type } = this.urlToU8A(url)
    return new File([data], name, { type })
  },
  urlToBlob(url: string) {
    const { data, type } = this.urlToU8A(url)
    return new Blob([data], { type })
  },
}
export default FileUtils
