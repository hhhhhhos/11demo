<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-menu router style="background-color:rgb(248,248,248);"  class="el-menu-demo" mode="horizontal" >
      <el-menu-item index="/" style="font-size:15px;">欢迎来到阿西吧商城</el-menu-item>
      <el-menu-item v-if="!this.$store.state.IsLogin" index="/user/login">登录</el-menu-item>
      <el-menu-item v-else index="/user/info">欢迎，{{ this.$store.state.UserName }}</el-menu-item>
      <el-menu-item index="/backend">后台</el-menu-item>
      <el-menu-item index="/user/info" style="float:right;">个人信息</el-menu-item>
      <el-menu-item index="/user/buylist" style="float:right;" >购物车</el-menu-item>
      <el-menu-item index="/user/historylist" style="float:right;">历史订单</el-menu-item>
    </el-menu>

    <router-view/>

  </div>
</template>


<script>
import axios from '@/utils'
export default {
  components: {
  },
  data() {
    return{
    }
  },
  methods:{
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
