<template>
  <div id="app" :style="`margin: 0;min-width: ${this.$store.state.MIN_WIDTH };`">
    <router-view />

  </div>
</template>

<script>

export default {

  data() {
    return{
    }
  },
  methods:{
    handleResize() {
      // 更新屏幕宽度
      const CURRENT_WIDTH = window.innerWidth;
      const CURRENT_HEIGHT = window.innerHeight;
      this.$store.state.CURRENT_WIDTH = CURRENT_WIDTH
      this.$store.state.CURRENT_HEIGHT = CURRENT_HEIGHT
      console.log("当前宽度："+CURRENT_WIDTH)
      console.log("当前高度："+CURRENT_HEIGHT)
      // 当前宽度为手机时
      if(CURRENT_WIDTH<500){
        this.$store.state.MIN_WIDTH = "300px"
        this.$store.state.IsMobile = true
      }else{
        this.$store.state.MIN_WIDTH = "1600px"
        this.$store.state.IsMobile = false
      }
    },
  },
  mounted() {
    // 组件挂载后，添加resize事件监听
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // 初始调用以设置屏幕宽度
  },
  beforeDestroy() {
    // 组件销毁前，移除事件监听
    window.removeEventListener('resize', this.handleResize);
  },
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
</style>

<style>
.myborder {
  border-radius: 5px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
}
html {
  height: 100%;
  box-sizing: border-box;
  background-color: rgb(243, 243, 244);
}
h1{
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.van-dropdown-menu__bar{
  height: 26px !important;
  box-shadow: none!important;
  background-color: transparent!important;
  
}
.my .van-ellipsis{
  color: #00000060!important;
}
.van-dropdown-menu__item{
  justify-content: left!important;
  margin: 3px 0 0 10px!important;
}
</style>

