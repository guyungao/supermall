<template>
  <div class="category">
    <!-- 首页导航 -->
    <nav-bar class="category-nav-bar"
      ><div slot="center">商品分类</div></nav-bar
    >

    <!-- 左侧导航 -->
    <slide-bar
      :slide-bar-list="categoryList"
      @slideBarItemClick="slideBarItemClick"
    />

    <scroll
      ref="scroll"
      class="scroll-height"
      :probe-type="3"
      @backTopScroll="contentScroll"
    >
      <!-- 当前商品推荐 -->
      <subcategory :category-list="subcategoryList" />
      <!-- 选项卡 -->
      <tab-control :titles="titleList" ref="tabControl" @tabClick="tabClick" />
      <!-- 选项分类数据展示 -->
      <goods-list :goods="categoryDetailList" @imageLoad="imageLoad"/>
    </scroll>

    <back-top  @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import SlideBar from "./childComps/SlideBar.vue";
import Subcategory from "./childComps/Subcategory.vue";
// 公用组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/conent/tabControl/TabControl.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "../../components/conent/goods/GoodsList.vue";
import { imgListenerMixin, backTopmixin } from "common/mixin";

import {
  getCategory,
  getCategoryDetail,
  getSubcategory,
} from "network/category";

export default {
  name: "Category",
  components: {
    SlideBar,
    Subcategory,

    NavBar,
    TabControl,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      categoryList: [],
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0,
      subcategoryList: [], //当前商品图片展示
      categoryDetailList: [], //选项分类数据展示
    };
  },
  mixins: [imgListenerMixin, backTopmixin],
  methods: {
    // 点击事件
    // 点击左侧选项时传出数据
    slideBarItemClick({ maitKey, index }) {
      // 防止反复请求
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      // 每次切换分类初始化tabControl的下标
      this.$refs.tabControl.curIndex = 0;
      // 请求对应的推荐列表
      this.getCategoryDetail(
        this.categoryList[this.currentIndex].miniWallkey,
        "pop"
      );
      this.getSubcategory(maitKey);
      this.$refs.scroll.scrollTo(0,0)
    },
    // 点击切换数据类型
    tabClick(index) {
      const typeList = ["pop", "new", "sell"];
      // 切换类型数据
      this.getCategoryDetail(
        this.categoryList[this.currentIndex].miniWallkey,
        typeList[index]
      );
    },
    contentScroll(position) {
      // this.listenshowBackTop(position)
      this.isShowBackTop = -position.y > 1000;
    },
    imageLoad(){
      // 监听商家图片信息是否加载完成，加载完成后执行refresh
      this.$refs.scroll.refresh();
    },

    // 数据请求
    // 左侧数据请求
    getCategory() {
      getCategory().then((res) => {
        // console.log(res.data.category.list);
        this.categoryList = res.data.category.list;
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[0].maitKey);
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
        });
      });
    },
    // 商品信息请求
    getSubcategory(key) {
      getSubcategory(key).then((res) => {
        // console.log(res.data.list);
        this.subcategoryList = [...res.data.list];
      });
    },
    // 选项商品数据请求
    getCategoryDetail(key, type) {
      getCategoryDetail(key, type).then((res) => {
        this.categoryDetailList = [...res];
      });
    },
  },
  created() {
    this.getCategory();
  },
  
};
</script>

<style scoped>
.category-nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
.scroll-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
.back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
</style>
