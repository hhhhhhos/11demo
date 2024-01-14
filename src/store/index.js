import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IsLogin : true, //登录状态
    UserName:null
  }
})