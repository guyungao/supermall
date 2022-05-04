// 引入挂载的Toast插件
import Toast  from'./Toast'

// 1、创建一个对象
const obj = {}

// 会默认传过来vue参数
obj.install = function(Vue){
  // 1.创建组件构造器 toast
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式,根据组件构造器,可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象手动挂载到某个元素上 div
  toast.$mount(document.createElement('div'))
  // 4.toast.$el就已经挂载到上面创建的div了,然后将div挂载到body上即可
  document.body.appendChild(toast.$el)
  // 5.最后将toast挂载到Vue的原型上
  Vue.prototype.$toast = toast;
}

// 将对象独享导出
export default obj