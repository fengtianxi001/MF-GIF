import { fileURLToPath, URL } from "node:url"
import { createHtmlPlugin } from "vite-plugin-html"
import { defineConfig } from "vite"
import { loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

const env = (mode: string, key: string) => loadEnv(mode, process.cwd())[key]
export default ({ mode }: any) => {
  return defineConfig({
    base: "./",
    build: {
      outDir: "./docs",
    },
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env(mode, "VITE_NAME"),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "@/assets/styles/variable.scss" as *;
              @use "@/assets/styles/mixins.scss" as *;
              @use "@/assets/styles/reset.scss" as *;
            `,
        },
      },
    },
    server: {
      hmr: true,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env(mode, "VITE_PROXY_TARGET"),
          changeOrigin: true,
        },
      },
    },
  })
}
