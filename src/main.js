import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router'
import store from './store'
import bootstrapvue from 'bootstrap-vue'

import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';


Vue.use(bootstrapvue)
Vue.use(ElementUI);

// 添加一个全局方法
Vue.prototype.$openURL = function (url) {
  window.open(url)
};
Vue.prototype.$openProduct = function (id) {
  this.$router.push(`/product?id=${id}`)
};


const vue = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
});

export default vue