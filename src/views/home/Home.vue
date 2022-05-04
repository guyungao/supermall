<template>
  <div id="home">
    <!-- 首页导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 选项卡 -->
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <!-- 滚动区域 -->
    <scroll
      class="scroll-height"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @backTopScroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 首页推荐 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- 选项卡 -->
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <!-- 首页数据goods -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// home子组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

// 公共组件
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/conent/tabControl/TabControl.vue";
import GoodsList from "components/conent/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

// mixin混入
import {imgListenerMixin,backTopmixin} from 'common/mixin'

// 网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  
  components: {
    // 子组件
    HomeSwiper,
    RecommendView,
    FeatureView,
    
    // 公共组件
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  
  data() {
    return {
      banners: [], //轮播图数据
      recommends: [], // 本周流行数据
      titles: ["流行", "新品", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    // 根据点击选项卡数据后更换type数值
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 事件点击
    // 根据事件点击获取对应的数据接口
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让选项卡滚动时，点击的index固定
      this.$refs.tabControl1.curIndex = index;
      this.$refs.tabControl2.curIndex = index;
    },
    // 轮播图加载完成后获取tabcontrol2的高度
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 获取位置
    contentScroll(position) {
      // 如果tabcontrol2的高度大于滑动的高度时，显示
      this.isTabFixed = -position.y > this.tabOffsetTop;
      this.listenshowBackTop(position)
    },
    // 监听是否下拉加载更多
    loadMore() {
      // 下拉到最下面时，执行此函数，此时页面数据+1,
      this.getHomeGoods(this.currentType);
      // 重新加载scroll高度
      this.$refs.scroll.scroll.refresh();
    },
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list; //轮播图数据
        this.recommends = res.data.recommend.list; // 本周推荐数据
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list); //将获取的数据push到goods.list里面
        this.goods[type].page += 1; //将页面数值+1
        this.$refs.scroll.finishPullUp(); //下拉重新加载更多
      });
    },
  },
  created() {
    // 首页的轮播图，推荐、流行数据请求
    this.getHomeMultidata();
    // 流行、新款、精品数据请求
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    // 刷新scroll的高度
    this.$refs.scroll.refresh();
    // 记录离开时的saveY值
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 保存离开时的Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局监听img的刷星
    this.$bus.$off("itemImageLoad", this.itemImglistener);
  },
  mixins:[imgListenerMixin,backTopmixin],
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.scroll-height {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>