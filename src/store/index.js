import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1、安装插件
Vue.use(Vuex)

// 2、创建实例
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

// 3、导出
export default store

// 4、挂载