<template>
    <div>
 <div>
  <ul v-for="ele in eleList" :key="ele.id">
  <li>{{ ele.name }}</li>
  </ul>
  <button @click="addEle">添加</button>
 </div>
 <div>
  <ul v-for="ele in todoList" :key="ele.id">
  <li>{{ ele.name }}</li>
  </ul>
  <button @click="addTodo">添加</button>
 </div>
 <div>{{ sum }}</div>

 <button @click="UserLogin">登陆</button>
 </div>
</template>
<style lang="less" scoped>

</style>


<script lang="ts">
import { onMounted,computed,onUnmounted,onUpdated,onBeforeUpdate,onActivated,onDeactivated,ref, reactive, toRefs, watch, nextTick, inject } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import user from '@/api/user'
export default({
   components: {
   },
  // props - 组件接受到的属性 context - 上下文 
  setup(props,context) {
    onMounted(() => {
    console.log(toRefs(props),'props');
    }),
    onUnmounted(() => {
    console.log('组件卸载')
    })
    
    onUpdated(() => {
    console.log('组件更新')
    })
    
    onBeforeUpdate(() => {
    console.log('组件将要更新')
    })
    
    onActivated(() => {
    console.log('keepAlive 组件 激活')
    })
    
    onDeactivated(() => {
    console.log('keepAlive 组件 非激活')
    })
   
    // ref
    const eleList = ref([]);
    function addEle() {
      let len = eleList.value.length
      eleList.value.push({
         id: len,
         name: 'ref 自增' + len
      })
    }
    
    // reactive
   const data = reactive({
      todoList: [],
      userName:'ddd',
   })
   function addTodo() {
      let len = data.todoList.length
      data.todoList.push({
         id: len,
         name: 'this.userName：' + this.userName + 'data.userName：'+data.userName
      })
      
   }

   // computed
   let sum = computed(() => data.todoList.length + eleList.value.length)
   watch(
      eleList,
      (curVal, oldVal) => {
         console.log('监听器：', curVal, oldVal)
      },
      {
         deep: true
      }
   )


   //roter
   //const route = useRoute() // 相当于 vue2 中的 this.$route
   //const router = useRouter() // 相当于 vue2 中的 this.$router


   async function UserLogin(){
      console.log('1111');
      let res = await user.Login({username:'18600890440',password:'123456'});
      console.log(res,'res');
   }

    return {
         eleList,
         sum,
         ...toRefs(data),
         addEle,
         addTodo,
         UserLogin,
    }
   }
})

</script>