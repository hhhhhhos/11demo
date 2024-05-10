<template>
  <div class="my-container">
    
    <div class="header">
      <img
        style="cursor: pointer;width:70px;height: 70px;border-radius: 90px;margin: 0px 0 15px 25px;border: 2px solid white;"
        :src="obj?.wechat_headimgurl?obj.wechat_headimgurl:target_img_src"
        @click="$router.push('/user/info/details')"
      >
      <div @click="$router.push('/user/info/details')"  style="margin: 0 0 25px 20px;font-size: 18px;color: white;cursor: pointer;">{{obj?.wechat_nickname?obj?.wechat_nickname:obj?.name}}</div>
      <img style="margin: 0 0 25px 5px;" v-if="obj?.wechat_nickname!==null" width="18px" height="18px" :src="require('@/assets/wechat_confirm.png')">
    </div>
    <div class="grid-nav"></div>
    <div style="text-align: left;margin: 0px 0 0 0;">
      <van-cell icon="user-circle-o" title-style="margin-left: 5px;" title="详细信息" is-link @click.native="$router.push('/user/info/details')" />
      <van-cell icon="chat-o" title-style="margin-left: 5px;" title=" 消息通知" is-link @click.native="handleClick('message')" /> <!-- Vue 2 中需要使用 .native 修饰符 -->
      <van-cell icon="edit" title-style="margin-left: 5px;" style="margin-top: 8px;" title="用户反馈" is-link @click.native="handleClick('feedback')" />
      <van-cell icon="smile-o" title-style="margin-left: 5px;" title="客服二号" is-link @click.native="handleClick('chatbot')" />
      <van-cell icon="setting-o" title-style="margin-left: 5px;" style="margin-bottom: 8px;" title="系统设置" is-link @click.native="handleClick('settings')" />
      <van-cell style="cursor: pointer;text-align: center;height: 50px;align-items: center;font-size: medium;" title="退出登录"  @click="logout"  />
    </div>
  </div>
</template>

<script>
import { Cell } from 'vant';
import { Dialog } from 'vant';
import axios from '@/utils'

export default {
  name: 'MyIndex',
  components: {
    'van-cell':Cell
  },
  props: {},
  data () {
    return {
      obj:null,
      target_img_src:require('@/assets/load.webp')
    }
  },
  methods: {
    handleClick(routeName) {
      console.log(routeName)
      Dialog.alert({message: "<h3>comming soon</h3>"})
    },
    getuserinfo(){

      axios.get('/user/info')
      .then(response=>{
        if(response.data.code)this.isloading1=false
        else this.$message.error("获取失败："+response.data.msg)
        this.obj = response.data.data
        if(this.obj?.wechat_headimgurl === null){
          this.target_img_src = require('@/assets/default_headimg2.png')
        }
      }).catch(error=>{
        console.log(error)
        this.$message.error("获取失败："+error.data.msg)
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
    },
  },
  mounted(){
    this.getuserinfo()
  }
}
</script>

<style scoped>
.my-container > .header {
  height: 160px;
  background-color: rgb(54, 170, 237);
  background-size: cover;
  display: flex;
  justify-content: start;
  align-items: center;
}


</style>
