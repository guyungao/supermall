import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // 代码需要判断，建议放到actions
  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        reslove('当前购买数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        reslove('已添加到购物车')
      }
    })
  }
}