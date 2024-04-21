import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IsLogin : true, //登录状态
    UserName:null,
    MIN_WIDTH:"1200px", // 屏幕最小宽度
    CURRENT_WIDTH:null, // 当前屏幕宽度
    CURRENT_HEIGHT:null,
    IsMobile:false,     // 判断是否是手机
    PAGE_STATE:'Tabbar',// 下边栏状态
  }
})