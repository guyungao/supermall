<template>
  <div class="bottom-bar">
    <div class="chenk-conent">
      <CheckButton class="check-botton" :isChecked="isSelectAll"  @click.native="checkClick"/>
      <span class="check-text">全选</span>
    </div>
    <div class="cart-bottom-price">
      合计：
      <span>¥ {{ totalPrice }}</span>
      元
    </div>
    <div class="cart-bottom-btn" @click="calcClick">
      <button>提交订单({{ checkedLength }})</button>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/conent/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 选中的价格
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    // 选中的商品
    checkedLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    // 判断是否选中商品
    isSelectAll() {
      // 如果数组数量为0，则没有商品，返回false
      if (this.cartList.length == 0) return false;
      // return !(this.cartList.filter(item=>!item.checked).length) 
      // return !this.cartList.find((item) => !item.checked);
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    },
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.checked = false)
      }else{
        this.cartList.forEach(item=>item.checked = true)
      }
    },
    // 如果没有选中商品时弹窗
    calcClick(){
      if(!this.cartList.find(item=>item.checked)){
        this.$toast.toastShow('请选择购买的商品')
      }else{
        this.$toast.toastShow('留待后续开发')
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  font-size: 15px;

  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;

  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background-color: #eee;
  border-top: 1px solid #cccccc;
}
.chenk-conent {
  display: flex;
  align-items: center;
}
.check-botton {
  width: 25px;
  height: 25px;
}
.cart-bottom-price {
  margin-left: 50px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

.cart-bottom-btn button:active {
  opacity: 0.8;
}
</style>