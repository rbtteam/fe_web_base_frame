<script lang="ts" setup name="AppFooter"></script>

<template>
   <footer class="app_footer">
      <!-- 联系我们 -->
      <div class="contact">
         底部
      </div>
   </footer>
</template>

<style scoped lang="less">
.app_footer {
   overflow: hidden;
   background-color: #f5f5f5;
   padding-top: 20px;
   .contact {
      background: #fff;
      .container {
         padding: 60px 0 40px 25px;
         display: flex;
      }
      dl {
         height: 190px;
         text-align: center;
         padding: 0 72px;
         border-right: 1px solid #f2f2f2;
         color: #999;
         &:first-child {
            padding-left: 0;
         }
         &:last-child {
            border-right: none;
            padding-right: 0;
         }
      }
      dt {
         line-height: 1;
         font-size: 18px;
      }
      dd {
         margin: 36px 12px 0 0;
         float: left;
         width: 92px;
         height: 92px;
         padding-top: 10px;
         border: 1px solid #ededed;
         .iconfont {
            font-size: 36px;
            display: block;
            color: #666;
         }
         &:hover {
            .iconfont {
               color: @xtxColor;
            }
         }
         &:last-child {
            margin-right: 0;
         }
      }
      .qrcode {
         width: 92px;
         height: 92px;
         padding: 7px;
         border: 1px solid #ededed;
      }
      .download {
         padding-top: 5px;
         font-size: 14px;
         width: auto;
         height: auto;
         border: none;
         span {
            display: block;
         }
         a {
            display: block;
            line-height: 1;
            padding: 10px 25px;
            margin-top: 5px;
            color: #fff;
            border-radius: 2px;
            background-color: @xtxColor;
         }
      }
      .hotline {
         padding-top: 20px;
         font-size: 22px;
         color: #666;
         width: auto;
         height: auto;
         border: none;
         small {
            display: block;
            font-size: 15px;
            color: #999;
         }
      }
   }
}
</style>
