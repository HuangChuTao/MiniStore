import {baseURL, baseURLS} from './config';
import request from './network'

//1.请求轮播图数据
export function getMultiData() {
  return request({
    url: baseURL + '/home/multidata',
  })
}

//2.请求商品数据
export function getGoodsData(type, page) {
  return request({
    url: baseURLS + '/home/data',
    data: {
      type,
      page
    }
  })
}