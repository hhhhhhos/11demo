<template>
  <div>
    <h1 class="myborder">用户信息</h1>
    <div class="myborder" style="margin: 30px 100px 20px 100px;padding: 10px;">
      <div class="myhover" v-for="(data,index) in this.obj" :key="index" style="text-align: left;display: flex;">
        <div v-if="!isupdateinfo" style="margin: 10px 90px;display: flex;">
          <div style="width: 100px;">{{ index }}</div>:<div style="margin:0 20px ;">{{ index==="create_time"?data.replace(/T/g, ' '):data }}</div>
        </div>
        <div v-else style="margin: 5px 90px;display: flex;">
          <div style="width: 100px;">{{ index }}</div>:
          <div style="margin:0px 20px ;">
            <el-input v-if="index!='id'&&index!='create_time'&&index!='role'" v-model="obj[index]" size="mini" placeholder="请输入内容"></el-input>
            <el-input v-else v-model="obj[index]" :disabled="true" size="mini" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
    </div>
    <el-button v-if="!isupdateinfo" type="primary" @click="isupdateinfo=true">修改</el-button>
    <el-button v-else type="primary" @click="updateuserinfo">提交</el-button>
    <el-button v-if="isupdateinfo" type="primary" @click="isupdateinfo=false">取消</el-button>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  data() {
    return{
      datas:[],
      obj:{
        "id": null,
        "name": null,
        "age": null,
        "sex": null,
        "address": null,
        "phone": null,
        "create_time": Date,
        "password": null
      },
      isupdateinfo:false
    }
  },
  methods:{
    getuserinfo(){
      axios.get('/user/info')
      .then(response=>{
        if(response.data.code)this.$message.success("获取成功")
        else this.$message.error("获取失败："+response.data.msg)
        this.obj = response.data.data
      }).catch(error=>{
        console.log(error)
        this.$message.error("获取失败："+error.data.msg)
      })
    },
    updateuserinfo(){
      if(this.obj.age!=null&&(this.obj.age>200||this.obj.age<0))return this.$message.error("年龄不合法")
      if(this.obj.sex!=null&&(this.obj.sex!="男"&&this.obj.sex!="女"))return this.$message.error("性别不合法")
      if (!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.obj.phone)))return this.$message.error("电话不合法")
      axios.put('/user/update',this.obj)
      .then(response=>{
        if(response.data.code){
          this.$message.success(response.data.data)
          setTimeout(() => {window.location.reload()}, 1000);
        }
        else this.$message.error("修改失败："+response.data.msg)   
      }).catch(error=>{
        console.log(error)
        this.$message.error("修改失败："+error)
      })
    },
    logout(){
      axios.get('/user/logout')
      .then(response=>{
        console.log(response)
        if(response.data.code){
          this.$message.success("退出登录成功")
          this.$store.state.IsLogin = false
          this.$router.push('/home')
        }
        else this.$message.error("退出失败："+response.data.msg)

      }).catch(error=>{
        console.log(error)
        this.$message.error("错误："+error.data.msg)
      })
    }
  },
  mounted(){
    this.getuserinfo()
  },
  watch:{
    // 守望者，未登陆不能访问本页
    '$store.state.IsLogin':function(){
      if(!this.$store.state.IsLogin)this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.myhover:hover{
  background-color: rgb(247,248,255);
}
</style>
