import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';

Vue.use(ElementUI);


const vue = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
});

export default vue