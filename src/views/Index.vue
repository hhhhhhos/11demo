<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-menu v-if="!this.$store.state.IsMobile" router style="background-color: white;"  class="el-menu-demo" mode="horizontal" >
      <el-menu-item index="/" style="font-size:15px;">欢迎来到阿西吧商城</el-menu-item>
      <el-menu-item v-if="!this.$store.state.IsLogin" index="/user/login">登录</el-menu-item>
      <el-menu-item v-else index="/user/info">欢迎，{{ this.$store.state.UserName }}</el-menu-item>
      <el-menu-item><button style="cursor: pointer;border: none;background-color: transparent;" @click="gotoback()">后台</button></el-menu-item>
      <el-menu-item index="/user/info" style="float:right;">个人信息</el-menu-item>
      <el-menu-item index="/user/buylist" style="float:right;" >购物车</el-menu-item>
      <el-menu-item index="/user/historylist" style="float:right;">历史订单</el-menu-item>
    </el-menu>

    <div v-else>
      <!-- 返回头标 -->
      <div v-if="this.$route.name !== 'home'" class="demo-nav" style="">
        <div class="demo-nav__title">{{this.$route.meta.title.replace("席巴商城 -","")}}</div>
        <svg viewBox="0 0 1000 1000" class="demo-nav__back" @click="$router.go(-1)">
          <path fill="#969799" fill-rule="evenodd" d="M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z">
          </path>
        </svg>
      </div>
      <div v-if="this.$route.name !== 'home'" style="height: 56px;"></div>

      <Tabbar v-if="this.$store.state.PAGE_STATE==='Tabbar'" route>
        <TabbarItem icon="home-o"  to="/home">主页</TabbarItem>
        <TabbarItem icon="completed-o" to="/user/historylist">订单</TabbarItem>
        <TabbarItem icon="cart-o" to="/user/buylist">购物车</TabbarItem>
        <TabbarItem icon="contact-o" to="/user/info" >个人信息</TabbarItem>
      </Tabbar>

    </div>

    <router-view/>

    <div style="height: 100px;width: 20px;"></div>

  </div>
</template>


<script>
import axios from '@/utils'
import { Tabbar, TabbarItem } from 'vant';

export default {
  components:{
    Tabbar,
    TabbarItem,
  },
  data() {
    return{
      url:process.env.VUE_APP_ADMIN_URL
    }
  },
  methods:{
    gotoback(){
      window.open(process.env.VUE_APP_ADMIN_URL, '_blank');
    },
    handleSelect(){
    },
    tohome(){
      if(this.$route.path!=='/')this.$router.push('/')
      else location.reload()
    }
  },
  mounted(){
    // 初始化时 检查一次本地和
    //服务器已登录 但本地记录没登录，就同步个名字,状态改成登录
    axios.get('/user/name')
    .then(response=>{
      if(response.data.code){
        this.$message.success("欢迎回来："+response.data.data);
        this.$store.state.IsLogin = true
        this.$store.state.UserName = response.data.data
        this.$store.state.UserId = response.data.map.user_id
      }else{
        //this.$message.error("error:"+response.data.msg);
        this.$store.state.IsLogin = false
      }
    })
    .catch(error=>{
      this.$message.error(error.data.msg);
      console.log(error)
      this.$store.state.IsLogin = false
    })
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.el-menu--horizontal > .el-menu-item {
  border-bottom: none !important;
  background-color: transparent !important;
  color: inherit !important;
}
.el-menu-item:hover {
  border-bottom: none !important;
  background-color:white !important;
}
.homehover:hover{
  background-color: red;
}


</style>

<style>
.demo-nav {
    position: fixed;  /* 从 relative 改为 fixed */
    top: 0;           /* 定位到页面顶部 */
    left: 0;          /* 定位到页面左边 */
    width: 100%;      /* 让导航栏宽度扩展至全屏 */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background-color: #fff;
    z-index: 1000;    /* 确保导航栏位于其他内容之上 */
}

.demo-nav__title {
    font-weight: 600;
    font-size: 17px;
    text-transform: capitalize;
}
.demo-nav__back {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
}
</style>
