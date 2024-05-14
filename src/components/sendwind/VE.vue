<template>
  <div>
    <!-- 电脑 -->
    <div v-if="!this.$store.state.IsMobile">
      <!-- 评论 -->
      <div class="demo-nav2">
        <input
          style="margin:5px auto;width: 81%;"
          class="el-input__inner"
          placeholder="发布一条评论吧"
          v-model="comment_info"
          type="text"
          @click="van_popup_show=true"
        />
      </div>
    </div>

     <!-- 手机 -->
     <div v-else>
      <!--评论 -->
      <div class="demo-nav3" >
        <input
          style="margin:5px 10px;"
          class="el-input__inner"
          placeholder="发布一条评论吧"
          type="text"
          v-model="comment_info"
          @click="van_popup_show=true"
        />
      </div>
    </div>

    <!-- 点评论 弹出输入 -->
    <van-popup v-model="van_popup_show" position="bottom" style="height: 200px;background-color: rgb(243, 243, 244);overflow-x: hidden;" >
      <div class="el-input" style="position: relative;display: flex;justify-content: start;">
        <input v-if="is_kefuchat"
          style="width: 87%;margin: 5px 25px 5px 5px;"
          class="el-input__inner"
          v-model="comment_info"
          @keyup.enter="sendComment"
          enterkeyhint="send"
          placeholder="发布一条评论吧"
          type="text"
        />
        <input v-else
          style="width: 90%;margin: 5px auto;"
          class="el-input__inner"
          v-model="comment_info"
          @keyup.enter="sendComment"
          enterkeyhint="send"
          placeholder="发布一条评论吧"
          type="text"
        />
        <span class="count_zishu" v-if="is_kefuchat" :style="`color:${comment_info.length>=50?'red':''}`">{{comment_info.length+"/50"}}</span>
      </div>
      <div style="height: 150px;overflow-y: scroll;">
        <EmojiPicker @emoji-selected="selectEmoji" />
      </div>
    </van-popup>


  </div>
</template>

<script>
import EmojiPicker from '@/components/emoji/EmojiPicker.vue';
import { Popup } from 'vant';

export default {
  components: {
    'van-popup': Popup,
    EmojiPicker,
  },
  props:{
    is_kefuchat:Boolean
  },
  data() {
    return{
      van_popup_show:false,
      comment_info:'',
    }
  },
  methods:{
    sendComment(){
      if(this.comment_info.length===0)return this.$message.error("输入为空")
      this.$emit('sendComment',this.comment_info)
    },
    selectEmoji(emoji){
      console.log(emoji)
      this.comment_info += emoji
    },
  },
  mounted(){

  },
  beforeDestroy(){

  }
}
</script>

<style scoped>
.demo-nav2 {
    position: fixed;  /* 从 relative 改为 fixed */
    bottom: 0;           /* 定位到页面顶部 */
    left: 0;          /* 定位到页面左边 */
    width: 100%;      /* 让导航栏宽度扩展至全屏 */
    min-width: 1600px;
    display: flex;
    background-color: rgb(243,243,244);
    height: 50px;
}
.demo-nav3 {
    position: fixed;  /* 从 relative 改为 fixed */
    bottom: 0;           /* 定位到页面顶部 */
    left: 0;          /* 定位到页面左边 */
    width: 100%;      /* 让导航栏宽度扩展至全屏 */
    display: flex;
    background-color: rgb(243,243,244);
    height: 50px;
}
.count_zishu{
  position: absolute;
  bottom:0;
  right:0;
  font-size: medium;
  text-align: right;
  margin: 0 5px 15px 0;
  color: rgb(96, 98, 102,0.6);
}
</style>
