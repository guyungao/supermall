<template>
  <div id="detail">
    <!-- 首页导航 -->
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="navbar" />

    <scroll
      class="scroll-height"
      ref="scroll"
      :probe-type="3"
      @backTopScroll="contentScroll"
    >
      <!-- 首页轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商店图片展示信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品尺寸信息 -->
      <detail-param-info :param-info="paramInfo" ref="param" />
      <!-- 商品评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- 推荐信息展示 -->
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>

    <!-- 底部工具栏 -->
    <detail-buttom-bar @addCart="addToCart" />
    <!-- 点击回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import DetailNavBar from "./childComps/DetailNavBar.vue"; //导航
import DetailSwiper from "./childComps/DetailSwiper.vue"; //轮播图
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"; //商品信息
import DetailShopInfo from "./childComps/DetailShopInfo.vue"; //商品信息
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"; //商品图片展示信息
import DetailParamInfo from "./childComps/DetailParamInfo.vue"; //商品尺寸信息
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"; //用户评价信息
import DetailButtomBar from "./childComps/DetailButtomBar.vue"; //底部工具栏



// 滚动
import Scroll from "components/common/scroll/Scroll.vue"; //滚动条
import GoodsList from "components/conent/goods/GoodsList.vue"; //商品推荐信息
import { imgListenerMixin, backTopmixin } from "common/mixin"; //Vue混入

// 网络请求
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    // 子组件
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailButtomBar,

    // 公用组件
    Scroll,
    GoodsList,

  },
  data() {
    return {
      iid: null,
      topImages: [], //轮播图
      goods: {}, //商品信息
      shop: {}, //商家信息
      detailInfo: {}, //商家图片展示信息
      paramInfo: {}, //产品参数
      commentInfo: {}, //评论信息
      recommends: [], //推荐信息
      themeTopYs: [], //元素的offsetTop
      positionY: 0, //滚动的位置
      currentIndex: 0, //当前滚动位置的navbar的index
    };
  },
  methods: {
    // 事件点击
    titleClick(index) {
      // 点击选项卡跳转到指定位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    // 监听滚动位置
    contentScroll(position) {
      //  监听滚动位置
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 当滚动距离大于当前index小于下一个index时，将navbar里面的currentindex设置为this.currentindex
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      // 监听点击总部
      this.listenshowBackTop(position);
    },
    // 监听图片加载完成
    imageLoad() {
      // 监听商家图片信息是否加载完成，加载完成后执行refresh
      this.$refs.scroll.refresh();

      // 图片加载完成后获取对应属性的offsetTop值
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        // 添加一个最大值好跟其他元素的位置作比较
        this.themeTopYs.push(Number.MAX_VALUE);
      });
    },
    // 数据请求
    getDetail() {
      getDetail(this.iid).then((res) => {
        const data = res.result;
        // 请求顶部的轮播图片
        this.topImages = data.itemInfo.topImages;
        // 请求商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 获取商家信息
        this.shop = new Shop(data.shopInfo);
        // 获取商家图片展示信息
        this.detailInfo = data.detailInfo;
        // 获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 获取商品评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
      });
    },
    getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    },
    // 点击购物车时将数据传送到vuex中
    addToCart() {
      const product = {};
      product.image = this.topImages[0]; //图片信息
      product.title = this.goods.title; // 标题
      product.desc = this.goods.desc; //描述
      product.price = this.goods.realPrice; //价格
      product.iid = this.iid; //商品id标识
      // 不能直接赋值，需要调用mutaions，比较复杂，建议使用actions
      // this.$store.commit('addCart',product)  //使用mutaions
      // 使用actions
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.toastShow(res)
      });
    },
  },
  created() {
    //  1、将路由请求过来的id赋值给iid
    this.iid = this.$route.params.iid;
    // 2、数据请求
    this.getDetail();
    // 3、商品推荐数据请求
    this.getRecommend();
  },
  destroyed() {
    //  离开页面时取消图片监听加载
    this.$bus.$off("itemImageLoad", this.itemImglistener);
  },
  mixins: [imgListenerMixin, backTopmixin],
};
</script>

<style scoped>
#detail {
  /* 脱离文档流 将tabbar覆盖隐藏*/
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.scroll-height {
  height: calc(100% - 93px);
}
</style>