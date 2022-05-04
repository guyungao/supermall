<template>
  <div class="shop-item">
    <!-- 循环部分 -->
    <div class="item-selector">
      <Check-button :isChecked="itemInfo.checked" @click.native="checkClick" />
    </div>

    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>

    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>

      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">
          <button class="sunButton" @click="sunClick" >-</button>
          <!-- :disabled = 'this.itemInfo.count <= 1' -->
          x{{ itemInfo.count }}
          <button class="addButton" @click="addClick">+</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/conent/checkButton/CheckButton.vue";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 点击取反
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    },
    sunClick(){
      this.itemInfo.count--
    },
    addClick(){
      this.itemInfo.count++
    }
  },
};
</script>

<style scoped>
.shop-item {
  font-size: 0;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #cccccc;
}

.shop-item:last-child {
  border-bottom: 0;
}

.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  width: 88%;
  padding: 5px 10px;
  color: #333333;
}

.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666666;
}

.info-bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  margin-top: 10px;
}

.info-bottom .item-price {
  color: #ff4500;
}
.sunButton {
  width: 20px;
  height: 20px;
}
.addButton{
  width: 20px;
  height: 20px;
}
</style>