// 创建路由
import { createRouter, createWebHashHistory } from "vue-router"

// 1. 创建路由

const router = createRouter({
   // 创建history模式的路由
   // history: createWebHistory(),
   // 创建hash模式的路由
   history: createWebHashHistory(),
   // 配置路由规则
   routes: [
      // Layout
      { path: "/", alias: "/home", component: () => import("@/views/layout/index.vue") },
      // 登录页
      { path: "/login", component: () => import("@/views/login/index.vue") },
   ],
})

export default router
