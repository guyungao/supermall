
import {request} from "./request";

// 整个数据请求
export function getCategory() {
  return request({
    url: "/category"
  }).catch(err => err);
}

// 请求展示goods数据
export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey
    }
  }).catch(err => err);
}

// 获取goods里面的分类数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  }).catch(err => err);
}