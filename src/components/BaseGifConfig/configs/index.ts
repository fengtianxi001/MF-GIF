import { createVNode } from "vue"
import { Tooltip } from "@arco-design/web-vue"
import { IconInfoCircle } from "@arco-design/web-vue/es/icon"

export const configs = {
  image: [
    {
      name: "gifWidth",
      label: "动图宽度",
      component: "InputNumber",
      defaultValue: 300,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "配置动图的宽度" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 1500,
        min: 0,
      },
    },
    {
      name: "gifHeight",
      label: "动图高度",
      component: "InputNumber",
      defaultValue: 300,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "配置动图的高度" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 1500,
        min: 0,
      },
    },
    // {
    //   name: "interval",
    //   label: "帧间隔",
    //   component: "InputNumber",
    //   defaultValue: 1,
    //   slots: {
    //     suffix: "秒",
    //     prefix: createVNode(Tooltip, { content: "每帧之间等待的时间" }, () =>
    //       createVNode(IconInfoCircle)
    //     ),
    //   },
    //   props: {
    //     max: 60,
    //     min: 0,
    //   },
    // },
    // {
    //   name: "numFrames",
    //   label: "帧数",
    //   component: "InputNumber",
    //   defaultValue: 1,
    //   slots: {
    //     suffix: "秒",
    //     prefix: createVNode(Tooltip, { content: "每帧之间等待的时间" }, () =>
    //       createVNode(IconInfoCircle)
    //     ),
    //   },
    // },
    {
      name: "frameDuration",
      label: "每帧的时长",
      component: "InputNumber",
      defaultValue: 1,
      slots: {
        suffix: "秒",
        prefix: createVNode(Tooltip, { content: "停留在每一帧上的时间" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 60,
        min: 0,
      },
    },
    {
      name: "numWorkers",
      label: "Worker数量",
      component: "InputNumber",
      defaultValue: 10,
      slots: {
        suffix: "个",
        prefix: createVNode(
          Tooltip,
          { content: "worker越多转化速度越快,但对设备性能要求越高" },
          () => createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 10,
        min: 1,
      },
    },
    {
      name: "text",
      label: "添加的文本",
      component: "Input",
      defaultValue: "@fengtainxi001",
      slots: {
        suffix: "文本",
        prefix: createVNode(Tooltip, { content: "填写的文本将出现在动图上" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
    },
    {
      name: "fontSize",
      label: "字体大小",
      component: "InputNumber",
      defaultValue: 12,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "文本的字体大小,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 50,
        min: 10,
      },
    },
    {
      name: "fontColor",
      label: "字体颜色",
      component: "Input",
      defaultValue: "#FFFFFF",
      slots: {
        suffix: "色号",
        prefix: createVNode(Tooltip, { content: "文本字体颜色,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
    },
    {
      name: "textXCoordinate",
      label: "文本横坐标",
      component: "InputNumber",
      defaultValue: 150,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "文本横坐标,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        min: 0,
      },
    },
    {
      name: "textYCoordinate",
      label: "文本纵坐标",
      component: "InputNumber",
      defaultValue: 300,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "文本纵坐标,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        min: 0,
      },
    },
  ],
  video: [
    {
      name: "gifWidth",
      label: "动图宽度",
      component: "InputNumber",
      defaultValue: 300,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "配置动图的宽度" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 1500,
        min: 0,
      },
    },
    {
      name: "gifHeight",
      label: "动图高度",
      component: "InputNumber",
      defaultValue: 300,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "配置动图的高度" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 1500,
        min: 0,
      },
    },
    // {
    //   name: "interval",
    //   label: "帧间隔",
    //   component: "InputNumber",
    //   defaultValue: 0.1,
    //   slots: {
    //     suffix: "秒",
    //     prefix: createVNode(Tooltip, { content: "每帧之间等待的时间" }, () =>
    //       createVNode(IconInfoCircle)
    //     ),
    //   },
    //   props: {
    //     max: 60,
    //     min: 0,
    //   },
    // },
    {
      name: "numFrames",
      label: "视频时长",
      component: "InputNumber",
      defaultValue: 1,
      slots: {
        suffix: "秒",
        prefix: createVNode(Tooltip, { content: "截取的视频时长" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
    },
    {
      name: "frameDuration",
      label: "每帧的时长",
      component: "InputNumber",
      defaultValue: 0.1,
      slots: {
        suffix: "秒",
        prefix: createVNode(Tooltip, { content: "停留在每一帧上的时间" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 60,
        min: 0,
      },
    },
    {
      name: "numWorkers",
      label: "Worker数量",
      component: "InputNumber",
      defaultValue: 10,
      slots: {
        suffix: "个",
        prefix: createVNode(
          Tooltip,
          { content: "worker越多转化速度越快,但对设备性能要求越高" },
          () => createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 10,
        min: 1,
      },
    },
    {
      name: "text",
      label: "添加的文本",
      component: "Input",
      defaultValue: "@fengtainxi001",
      slots: {
        suffix: "文本",
        prefix: createVNode(Tooltip, { content: "填写的文本将出现在动图上" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
    },
    {
      name: "fontSize",
      label: "字体大小",
      component: "InputNumber",
      defaultValue: 12,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "文本的字体大小,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        max: 50,
        min: 10,
      },
    },
    {
      name: "fontColor",
      label: "字体颜色",
      component: "Input",
      defaultValue: "#FFFFFF",
      slots: {
        suffix: "色号",
        prefix: createVNode(Tooltip, { content: "文本字体颜色,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
    },
    {
      name: "textXCoordinate",
      label: "文本横坐标",
      component: "InputNumber",
      defaultValue: 150,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "文本横坐标,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        min: 0,
      },
    },
    {
      name: "textYCoordinate",
      label: "文本纵坐标",
      component: "InputNumber",
      defaultValue: 300,
      slots: {
        suffix: "像素",
        prefix: createVNode(Tooltip, { content: "文本纵坐标,填写文本后该设置才生效" }, () =>
          createVNode(IconInfoCircle)
        ),
      },
      props: {
        min: 0,
      },
    },
  ],
  camera: [],
}
