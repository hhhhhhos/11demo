<template>
  <div style="">
    <div style="position: relative;height: 100px;">
      <div style="position: absolute;left:280px;top: 30px;font-family: 'PingFang SC';font-weight:900 ;letter-spacing: 3px;font-size: x-large;text-shadow: 5px 5px 4px rgba(0,0,0,0.5);">
        <router-link to="/home">席巴商城</router-link>
      </div>
      <div style="position: absolute;right: 10%;top:80%;">
        <div v-if="!IsRegis" class="login-box">
          <h2>用户登陆</h2>
          <form>
            <input type="text" v-model=name placeholder="用户名">
            <input type="password" v-model=password placeholder="密码">
            <div style="margin: 20px 0;"><div style="display: inline;"><a href="#" @click="IsRegis=true">去注册</a></div><div style="display: inline;margin-left: 100px;"><a href="#" @click="$alert('这都能忘？')">忘记密码</a></div></div>
            <el-button type="submit" @click="login">登陆</el-button>
          </form>
        </div> 
        <div v-else>
          <RE @ChangeToLogin="IsRegis=false"></RE>
        </div>
      </div>
    </div>
    <div class="fuck"></div>
  </div>
</template>

<script>
import axios from '@/utils'
import RE from '@/components/ElRegis.vue'

export default {
  components:{
    RE
  },
  data() {
    return{
      name:null,
      password:null,
      IsRegis:false
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
  mounted(){
    // 初始化时 检查一次本地和
    //服务器已登录 但本地记录没登录，就同步个名字,状态改成登录
    axios.get('/user/name')
    .then(response=>{
      if(response.data.code){
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

.fuck{
  background-image: url(../assets/B2.webp);
  background-size:contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 540px;
  background-color: rgb(106, 181, 1);
}

a:-webkit-any-link {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.666);
}

a:hover{
  color:black;
}
</style>

