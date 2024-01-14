<template>
  <div>
    <div v-if="!this.$store.state.IsLogin" class="login-box">
      <h2>用户登陆</h2>
      <form>
        <input type="text" v-model=name placeholder="用户名">
        <input type="password" v-model=password placeholder="密码">
        <p><router-link to="/user/regis">注册</router-link></p>
        <el-button type="submit" @click="login">登陆</el-button>
      </form>
    </div> 
    <div v-else class="login-box">
      <h3>已登录..正在跳转</h3>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data() {
    return{
      name:null,
      password:null
    }
  },
  methods:{
    login(){
    if(this.name===null)return this.$message.error("用户名不能为空")
    if(this.password===null)return this.$message.error("密码不能为空")
    axios.post('/user/login',{
        name:this.name,
        password:this.password
      }).then(response=>{
        if(response.data.code===0){
          this.$message.error(response.data.msg)
          if(response.data.msg==="已登录，不能重复登录"){
            //服务器已登录 但本地记录没登录，就同步个名字,状态改成登录
            axios.get('/user/name')
            .then(response=>{
              //console.log("名字是："+response.data.data)
              this.$store.state.IsLogin = true
              this.$store.state.UserName = response.data.data
              setTimeout(() => {this.$router.push('/home')}, 1000);
            })
            .catch(error=>{
              this.$message.error(error.data.msg);
              console.log(error)
            })
          }

        }
        else {
          this.$message.success(response.data.data)
          this.$store.state.IsLogin = true
          this.$store.state.UserName = this.name
          setTimeout(() => {this.$router.push('/home')}, 1000);
        }
        console.log(response)
      }).catch(error=>{
        this.$message.error(error.data.msg);
        console.log(error)
      })
    }
  },
  created(){
    console.log("login!!")
  },
  watch:{
    // 守望者，已登陆不能访问本页
    '$store.state.IsLogin':function(){
      if(this.$store.state.IsLogin)this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.login-box {
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 100px;
}

.login-box h2 {
  text-align: center;
  font-size: 26px;
  margin-top: 0;
}

.login-box form {
  display: flex;
  flex-direction: column;
}

.login-box input {
  height: 35px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.login-box button {
  height: 45px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.login-box button:hover {
  background-color: #0062cc
} 
</style>
