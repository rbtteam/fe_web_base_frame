import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 导入样式抹平
import "normalize.css"
// 导入全局css
import "@/assets/styles/common.less"




const app = createApp(App);
app.use(router);
// app.use(ElementPlus)
app.config.errorHandler = (err, vm, info) => {
   // 处理错误
   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
 }
app.mount("#app");
