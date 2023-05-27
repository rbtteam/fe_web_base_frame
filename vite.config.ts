import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const path = require("path")
// 组件name名字插件  用于调试搜索组件名 等作用
import vueSetupExtend from "vite-plugin-vue-setup-extend"
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue(), vueSetupExtend()],
   resolve: {
      //别名
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   css: {
      preprocessorOptions: {
         less: {
            additionalData: `
            @import "@/assets/styles/variables.less";
            @import "@/assets/styles/mixins.less";
          `,
         },
      },
   },
})
