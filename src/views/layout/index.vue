<script setup lang="ts" name="Layout">
// 导入组件
import AppTopnav from "./components/app-topnav.vue"
import AppHeader from "./components/app-header.vue"
import AppFooter from "./components/app-footer.vue"
</script>
<template>
   <!-- 顶部组件 -->
   <AppTopnav> </AppTopnav>
   <!-- 头部组件 -->
   <AppHeader></AppHeader>
   <!-- 路由出口 -->
   <router-view></router-view>
   <!-- 底部组件 -->
   <AppFooter></AppFooter>
</template>
<style lang="less" scoped></style>
