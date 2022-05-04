<template>
  <div class="cart-list">
    <scroll class="scroll-height" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
import scroll from "components/common/scroll/Scroll.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem,
    scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh()
  },
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: 100%;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>