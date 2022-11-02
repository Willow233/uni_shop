import request from '@/utils/request'

export function getCateList() {
 return request({
   url:'/api/public/v1/categories'
 })
 }