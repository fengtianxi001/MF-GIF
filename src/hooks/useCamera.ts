import { Message } from "@arco-design/web-vue"
import { nextTick, onMounted, ref, shallowRef, type Ref } from "vue"

export function useCamera(container: Ref<HTMLElement>) {
  const status = ref<"waiting" | "recording" | "end">("waiting")
  const data = shallowRef<Blob[]>([]) //存放视频数据
  const stream = shallowRef<MediaStream>(new MediaStream()) //存放视频流
  const recorder = shallowRef<MediaRecorder>() //存放录制器
  const video = document.createElement("video")
  video.style.width = "100%"
  onMounted(() => {
    nextTick(() => {
      container.value.appendChild(video)
    })
  })
  //开启摄像头
  const onOpenCamera = async () => {
    const constraints = { video: true }
    stream.value = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = stream.value
    video.controls = false
    video.play()
  }
  //关闭摄像头
  const onCloseCamera = () => {
    stream.value.getTracks().forEach((track) => track.stop())
  }
  //开始录像
  const onStartRecorder = async () => {
    Message.success("录像中,记得保持微笑哦")
    video.srcObject = stream.value
    video.controls = false
    video.play()
    data.value = []
    status.value = "recording"
    recorder.value = new MediaRecorder(stream.value, { mimeType: "video/webm" })
    recorder.value.start()
    recorder.value.addEventListener("dataavailable", (event) => data.value.push(event.data))
    recorder.value.addEventListener("stop", () => {
      //console.log("end")
      video.srcObject = null
      video.src = URL.createObjectURL(new Blob(data.value))
      video.play()
      video.controls = true
    })
  }
  //停止录像
  const onStopRecorder = () => {
    status.value = "end"
    recorder.value?.stop()
  }

  return {
    data,
    status,
    video,
    onOpenCamera,
    onCloseCamera,
    onStartRecorder,
    onStopRecorder,
  }
}
