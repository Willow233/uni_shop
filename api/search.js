import request from '@/utils/request'

export function getSearchList(data) {
 return request({
   url:'/api/public/v1/goods/qsearch',
   data
 })
 }