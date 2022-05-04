<template>
  <div class="nav-bar">
     <div class="left"><slot name="left"></slot></div>
     <div class="center"><slot name="center"></slot></div>
     <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
 name:'NavBar'
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    /* 一般导航栏为44px */
    height: 44px;
    line-height: 44px;
    box-shadow: 0 1px 1px rgb(100,100,100,.2);
    text-align: center;
  }
  .left,.right{
    width: 60px;
    /* background-color: red; */
  }
  .center{
    flex: 1;
    /* background-color: blue; */
  }
  

</style>