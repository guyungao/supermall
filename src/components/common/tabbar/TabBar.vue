<template>
  <div class="tab-bar">
     <slot></slot>
  </div>
</template>

<script>
export default {
 name:'TabBar'
}
</script>

<style scoped>
  .tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /* 增加阴影 */
    box-shadow: 0 -2px -2px rgb(0, 0, 0 .2)
  }
</style>