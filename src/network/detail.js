
import {request} from "./request";

// 根据iid请求数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  }).catch(err => err);
}
// 获取商品信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title  //标题
    this.desc = itemInfo.desc   // 描述：新款上市
    this.newPrice = itemInfo.price  //新价格 有点为区间价格 100~200
    this.oldPrice = itemInfo.oldPrice //原本价格 ￥
    this.discount = itemInfo.discountDesc // 颜色
    this.realPrice = itemInfo.lowNowPrice //最低价格 ￥
    this.columns = columns //销量 收藏 快递
    this.services = services // 退货补运费，全部包邮等数据
  } 
}
// 获取商家信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;  //logo
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
// 获取参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
// 获取详情页的图片
export function getRecommend(){
  return request({
    url: "/recommend"
  }).catch(err => err);
}