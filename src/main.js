import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router'
import store from './store'
import bootstrapvue from 'bootstrap-vue'
import moment from 'moment'

import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';


Vue.use(bootstrapvue)
Vue.use(ElementUI);

// 添加一个全局方法
// 新窗口打开
Vue.prototype.$openURL = function (url) {
  window.open(url)
};

// 打开网页2 页内
Vue.prototype.$openURL2 = function (url) {
  window.location.href = url
};
Vue.prototype.$openProduct = function (id) {
  this.$router.push(`/product?id=${id}`)
};

Vue.prototype.$FormDate = function (date) {
  if (!date) return '未知' // 防空报错
  const now = moment()
  const inputDate = moment(date)

  const diffInSeconds = now.diff(inputDate, 'seconds')
  const diffInMinutes = now.diff(inputDate, 'minutes')
  const diffInHours = now.diff(inputDate, 'hours')
  const diffInDays = now.diff(inputDate, 'days')

  if (diffInSeconds < 60) {
    return `在线`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`
  } else if (diffInHours < 24) {
    return `${diffInHours}小时前`
  } else if (diffInDays < 30) {
    return `${diffInDays}天前`
  } else {
    return `30天前`
  }
}


const vue = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
});

export default vue