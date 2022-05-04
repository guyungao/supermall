<template>
  <div class="goods-item" @click="itemImgClick">
    <img v-lazy="showImage" alt="" @load="imageload" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collert">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 监听图片是否加载完成
    imageload() {
      this.$bus.$emit("itemImageLoad");
    },
    // 将点击图片的lid传递给详情页
    itemImgClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    //  判断数据img，首页里面的数据show.img或者详情页里面的数据image
    showImage() {
      return this.goodsItem.image  || this.goodsItem.img || this.goodsItem.show.img;
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collert {
  position: relative;
}

.goods-info .collert::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>