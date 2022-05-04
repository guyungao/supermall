import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/base.css"; //全局样式
import toast from 'components/common/toast' // 引入toast(弹窗)插件
import FastClick from 'fastclick' // 导入延时调用
import VueLazyLoad from 'vue-lazyload' // 导入图片懒加载

// 引入图标icon

// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);
import { Icon } from 'vant';
Vue.use(Icon);

Vue.use(toast) // 安装toast插件
Vue.prototype.$bus = new Vue()// 增加$bus事件总线
FastClick.attach(document.body)// 解决移动端300ms延时
Vue.use(VueLazyLoad, {loading: require("assets/img/common/placeholder.png")});// 使用懒加载图片

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


