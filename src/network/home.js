// 将首页需要的数据进行封装，方便管理整个首页的数据请求
import { request } from "./request"

// 首页的轮播图，推荐、流行数据请求
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  }).catch(err => err);
}

// 流行、新款、精品数据请求
export function getHomeGoods(type, page) {
  return request({
      url: 'home/data',
      params: {
          type,
          page
      }
  }).catch(err => err);
}