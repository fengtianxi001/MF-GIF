import utils from "@/utils/index"

export const menus = [
    {
        id: utils.createUUID(),
        url: "/image",
        icon: "el-icon-picture",
        cn: "图片转GIF",
        en: "IMG2GIF"
    },
    {
        id: utils.createUUID(),
        url: "/video",
        icon: "el-icon-video-camera-solid",

        cn: "视频转GIF",
        en: "VIDEO2GIF"
    },
    {
        id: utils.createUUID(),
        url: "/camera",
        icon: "el-icon-camera-solid",
        cn: "摄像头转GIF",
        en: "CAMERA2GIF"
    }
]