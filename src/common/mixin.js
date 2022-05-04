import {debounce} from './Utils'
import BackTop from "components/conent/backTop/BackTop.vue";

export const imgListenerMixin = {
  data() {
    return {
      // 设置图片加载完成执行函数
      itemImglistener:null
    }
  },
  mounted() {
    // 监听时间总线中的图片是否加载完成，加载完成后重新计算scroll高度
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImglistener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImglistener);
  },
}

export const backTopmixin = {
  components:{
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    listenshowBackTop(position){
      // 当滑动的高度大于1000时显示
      this.isShowBackTop = -position.y > 1000;
    },
    // 点击返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },

  
}
