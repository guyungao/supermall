<template>
  <div id="shopcart">
    <!-- 顶部导航栏 -->
     <nav-bar class="nav-bar">
       <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>
     <!-- 商品信息 -->
     <cart-list />
     <!-- 底部汇总 -->
     <cart-bottom-bar/>
  </div>
</template>

<script>
// 子组件
import CartList from './childComps/CartList.vue'  //商品列表
import CartBottomBar from './childComps/CartBottomBar.vue'  //底部汇总
// 公用组件
import NavBar from 'components/common/navbar/NavBar.vue' //导航栏
// vuex组件调用
import{mapGetters} from 'vuex'

export default {
 name:'Shopcart',
 components:{
   CartList,
   CartBottomBar,
   NavBar
 },
 computed:{
   ...mapGetters(['cartLength'])
  //  length(){
  //    return this.$store.getters.cartLength
  //  }
 }
}
</script>

<style scoped>
.nav-bar {
  position: relative;
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
</style>