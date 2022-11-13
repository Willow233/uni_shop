import request from '@/utils/request'

export function getGoodsList(data) {
 return request({
   url:'/api/public/v1/goods/search',
   data
 })
 }