<template>
  <div class="profile">
    <!-- 首页导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">冷月的商城</div>
    </nav-bar>
    <!-- 账户信息显示 -->
    <login/>
    <money/>
    <profile-list/>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
// 子组件
import Login from './childComps/Login.vue'
import Money from './childComps/Money.vue'
import profileList from './childComps/profileList.vue'
export default {
 name:'Profile',
 components:{
   Login,
   NavBar,
   Money,
   profileList
 }
}
</script>

<style scoped>
.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

</style>