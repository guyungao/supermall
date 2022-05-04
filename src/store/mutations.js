import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
  // 将点击时的数据传入到cartlist中
  // mutations 目的之一就是修改state中的状态
  // 每个方法比较单一一点
  // 如果比较复杂，判断较多，建议用actions计算
  // addCart(state, payload) {
  //   // 需要判断payload的值，
  //   // 如果item重复，则直接赋值
  //   // 如果id重复，则数量加1，如果id不重复，则push进去
  //   // let oldProduct = null
  //   // for (let item of state.cartList) {
  //   //   if (item.iid == payload.iid) {
  //   //     oldProduct = item
  //   //   }
  //   // }
  //   // if (oldProduct) {
  //   //   oldProduct.count += 1
  //   // } else {
  //   //   payload.count = 1
  //   //   state.cartList.push(payload)
  //   // }
  //   // 设置变量为oldProduct,然后根据已有的cartlist数组进行帅选，如果有则count+1,如果没有则加进cartlist
  //   // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   // if (oldProduct) {
  //   //   oldProduct.count += 1
  //   // } else {
  //   //   payload.count = 1
  //   //   state.cartList.push(payload)
  //   // }
  // }
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    // 添加商品信息时，增加check属性，默认为true
    payload.checked = true
    state.cartList.push(payload)
  }
}